import * as crypto from 'crypto'
import * as forge from 'node-forge'

export default class CertificateServices {
  constructor() {}

  create(commonName: string, nodeName: string, days: number) {
    const caAttr: forge.pki.CertificateField[] = [{ name: 'commonName', value: commonName }]

    const caExts = [
      {
        name: 'basicConstraints',
        cA: true,
      },
      {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          {
            type: 6,
            value: 'https://mijin.io',
          },
        ],
      },
    ]

    const caKey = this.generateKeyPairEd25519()
    // Create CA
    const caCert = this.createCert(caKey.publicKey, caAttr, days, caExts)

    // CA seif-sign
    caCert.sign(caKey.privateKey)

    const clientAttr: forge.pki.CertificateField[] = [
      {
        shortName: 'CN',
        value: `${nodeName}.${commonName}`,
      },
    ]

    const clientExts = [
      {
        name: 'basicConstraints',
        cA: false,
      },
      {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          {
            type: 2,
            value: `${nodeName}.${commonName}`,
          },
        ],
      },
    ]

    const clientKey = this.generateKeyPairEd25519()
    // Create Client CSR
    const clientReq = this.createCertRequest(clientKey.publicKey, clientAttr)
    clientReq.sign(clientKey.privateKey)

    // Create Client Cert
    const clientCert = this.createCert(clientKey.publicKey, clientAttr, days, clientExts, clientReq, caCert)

    // Client Cert from CA sign
    clientCert.sign(caKey.privateKey)

    // Create CA Cert to Pem
    const certPem = forge.pki.certificateToPem(caCert)
    // Create Client Cert to Pem
    const clientCertPem = forge.pki.certificateToPem(clientCert)
    // @ts-ignore
    const privPem = forge.ed25519.privateKeyToPem(caKey.privateKey)
    // @ts-ignore
    const pubPem = forge.ed25519.publicKeyToPem(caKey.publicKey)
    // @ts-ignore
    const clientPrivPem = forge.ed25519.privateKeyToPem(clientKey.privateKey)

    const caHexKey = this.keyBufferToHex(caKey)
    const clientHexKey = this.keyBufferToHex(clientKey)

    return {
      ca: {
        privateKeyPem: privPem,
        publicKeyPem: pubPem,
        certPem: certPem,
        publicKey: caHexKey.publicKey,
        privateKey: caHexKey.privateKey,
      },
      client: {
        privateKeyPem: clientPrivPem,
        certPem: clientCertPem,
        publicKey: clientHexKey.publicKey,
        privateKey: clientHexKey.privateKey,
      },
    }
  }

  private generateKeyPairEd25519() {
    return forge.pki.ed25519.generateKeyPair()
  }

  private createCert(
    publicKey: forge.pki.PublicKey,
    attr: forge.pki.CertificateField[],
    expire_days: number,
    exts?: any[],
    csr?: forge.pki.CertificateRequest,
    caCert?: forge.pki.Certificate
  ) {
    // Create Certificate
    const cert = forge.pki.createCertificate()

    cert.serialNumber = crypto.randomBytes(19).toString('hex')

    cert.validity.notBefore = new Date()
    cert.validity.notAfter = new Date()
    // CA Expire
    cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + (expire_days || 365))

    cert.publicKey = csr ? csr.publicKey : publicKey
    csr ? cert.setSubject(csr.subject.attributes) : cert.setSubject(attr)
    caCert ? cert.setIssuer(caCert.subject.attributes) : cert.setIssuer(attr)

    if (exts) cert.setExtensions(exts)

    return cert
  }

  private createCertRequest(publicKey: forge.pki.PublicKey, attr: forge.pki.CertificateField[]) {
    // Create Cert Request
    const cert = forge.pki.createCertificationRequest()
    cert.publicKey = publicKey

    cert.serialNumber = crypto.randomBytes(19).toString('hex')
    cert.setSubject(attr)

    return cert
  }

  private keyBufferToHex(keys: {
    publicKey: forge.pki.ed25519.NativeBuffer
    privateKey: forge.pki.ed25519.NativeBuffer
  }) {
    // @ts-ignore
    return {
      // @ts-ignore
      publicKey: Buffer.from(keys.publicKey.publicKeyBytes.slice(0, 32)).toString('hex'),
      // @ts-ignore
      privateKey: Buffer.from(keys.privateKey.privateKeyBytes.slice(0, 32)).toString('hex'),
    }
  }
}
