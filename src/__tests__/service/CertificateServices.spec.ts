import CertificateServices from '../../service/CertificateServices'

const config = {
  commonName: 'mijin.io',
  nodeName: 'node',
  days: 3650,
}

const certificateServices = new CertificateServices()

describe('start create certificate test', () => {
  it('Create Certificate function', async () => {
    const cert = certificateServices.create(config.commonName, config.nodeName, config.days)
    expect(cert).toBeDefined()
    expect(cert.ca.privateKey).toHaveLength(64)
    expect(cert.ca.publicKey).toHaveLength(64)
    expect(cert.client.privateKey).toHaveLength(64)
    expect(cert.client.publicKey).toHaveLength(64)
  })
})
