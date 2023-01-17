import AccountServices from '../../service/AccountServices'
import RepositoryFactory from '../../service/RepositoryFactory'
import { IAccountGenerateOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, writeConfig, checkFile, writeFile, checkDir, createDir } from '../../utils'
import userEnv from 'userEnv'
import CertificateServices from '../../service/CertificateServices'

const logger = LoggerFactory.getLogger()

export default async (option: IAccountGenerateOption) => {
  const { url, nodename, readfile, writefile, certsdir, privatekey, service } = option

  let configFile

  if (readfile && (await checkFile(readfile))) {
    configFile = await readConfig(readfile)
  }

  const mijinUrl = url ? url : configFile ? configFile.url : undefined

  if (!mijinUrl) {
    logger.error(`Must Set mijin URL(-u http://xxxxxx.com:3000) or Set Read Config(-r config.json)`)
    return
  }

  let repo

  try {
    repo = new RepositoryFactory(mijinUrl)
    await repo.init()
  } catch (error) {
    logger.error(`Please specify a valid URL: ${mijinUrl}`)
    return
  }

  const networkType = repo.getNetwork()
  const epoch = repo.getEpoch()

  logger.info(`mijin URL: ${mijinUrl}`)
  logger.info(`Network: ${networkType.toString()}`)
  logger.info(`Mosaic Currency Id: ${repo.getCurrency().currency.mosaicId?.id.toHex()}`)
  logger.info(`Mosaic Harvest Id: ${repo.getCurrency().harvest.mosaicId?.id.toHex()}`)

  logger.info('Start Account Generate...')

  if (service) {
    const workAccount = AccountServices.generate(repo.getNetwork())
    const vrfAccount = AccountServices.generate(repo.getNetwork())
    const votingAccount = AccountServices.generate(repo.getNetwork())

    const test1Account = AccountServices.generate(repo.getNetwork())
    const test2Account = AccountServices.generate(repo.getNetwork())

    const balanceAccount = privatekey ? AccountServices.createAccount(privatekey, repo.getNetwork()) : ''

    const certService = new CertificateServices()

    const nodeCert = certService.create(
      userEnv.mijin.cert.conmmonName,
      nodename ? nodename : 'node',
      userEnv.mijin.cert.days
    )

    const mainAccount = AccountServices.createAccount(nodeCert.ca.privateKey, repo.getNetwork())

    const createConfigFile = {
      url: mijinUrl,
      workAccount: {
        publicKey: configFile?.workAccount.publicKey ? configFile?.workAccount.publicKey : workAccount.publicKey,
        privateKey: configFile?.workAccount.privateKey ? configFile?.workAccount.privateKey : workAccount.privateKey,
        address: configFile?.workAccount.address ? configFile?.workAccount.address : workAccount.address.plain(),
      },
      balanceAccount: {
        publicKey: configFile?.balanceAccount.publicKey
          ? configFile?.balanceAccount.publicKey
          : balanceAccount
          ? balanceAccount.publicKey
          : '',
        privateKey: configFile?.balanceAccount.privateKey
          ? configFile?.balanceAccount.privateKey
          : balanceAccount
          ? balanceAccount.privateKey
          : '',
        address: configFile?.balanceAccount.address
          ? configFile?.balanceAccount.address
          : balanceAccount
          ? balanceAccount.address.plain()
          : '',
      },
      mainAccount: {
        publicKey: configFile?.mainAccount.publicKey ? configFile?.mainAccount.publicKey : mainAccount.publicKey,
        privateKey: configFile?.mainAccount.privateKey ? configFile?.mainAccount.privateKey : mainAccount.privateKey,
        address: configFile?.mainAccount.address ? configFile?.mainAccount.address : mainAccount.address.plain(),
      },
      keylink: {
        vrf: {
          publicKey: configFile?.keylink.vrf.publicKey ? configFile?.keylink.vrf.publicKey : vrfAccount.publicKey,
          privateKey: configFile?.keylink.vrf.privateKey ? configFile?.workAccount.privateKey : vrfAccount.privateKey,
          address: configFile?.keylink.vrf.address ? configFile?.keylink.vrf.address : vrfAccount.address.plain(),
        },
        voting: {
          publicKey: configFile?.keylink.voting.publicKey
            ? configFile?.keylink.voting.publicKey
            : votingAccount.publicKey,
          privateKey: configFile?.keylink.voting.privateKey
            ? configFile?.keylink.voting.privateKey
            : votingAccount.privateKey,
          address: configFile?.keylink.voting.address
            ? configFile?.keylink.voting.address
            : votingAccount.address.plain(),
        },
      },
      test1Account: {
        publicKey: configFile?.test1Account.publicKey
          ? configFile?.test1Account.publicKey
          : test1Account
          ? test1Account.publicKey
          : '',
        privateKey: configFile?.test1Account.privateKey
          ? configFile?.test1Account.privateKey
          : test1Account
          ? test1Account.privateKey
          : '',
        address: configFile?.test1Account.address
          ? configFile?.test1Account.address
          : test1Account
          ? test1Account.address.plain()
          : '',
      },
      test2Account: {
        publicKey: configFile?.test2Account.publicKey
          ? configFile?.test2Account.publicKey
          : test2Account
          ? test2Account.publicKey
          : '',
        privateKey: configFile?.test2Account.privateKey
          ? configFile?.test2Account.privateKey
          : test2Account
          ? test2Account.privateKey
          : '',
        address: configFile?.test2Account.address
          ? configFile?.test2Account.address
          : test2Account
          ? test2Account.address.plain()
          : '',
      },
    }

    if (!configFile && certsdir) {
      if (!(await checkDir(certsdir))) {
        await createDir(certsdir)
        logger.info('Create Cert Directory: ' + certsdir, null, '  ')
      }

      logger.info('Create Cert: CA', null, '  ')
      await writeFile(`${certsdir}/ca.cert.pem`, nodeCert.ca.certPem)
      // await writeFile(`${certsdir}/ca.key.pem`, nodeCert.ca.privateKeyPem)
      await writeFile(`${certsdir}/ca.pubkey.pem`, nodeCert.ca.publicKeyPem)
      logger.info('Create Cert: Client', null, '  ')
      await writeFile(`${certsdir}/node.key.pem`, nodeCert.client.privateKeyPem)
      await writeFile(`${certsdir}/node.crt.pem`, nodeCert.client.certPem)
      await writeFile(`${certsdir}/node.full.crt.pem`, [nodeCert.client.certPem, nodeCert.ca.certPem].join(''))
    }

    if (writefile) {
      logger.info('Write Config File: ' + writefile, null, '  ')
      await writeConfig(writefile, JSON.stringify(createConfigFile, null, '  '))
    }

    logger.info('New Account: ' + JSON.stringify(createConfigFile, null, '  '))
  } else {
    const newAccount = AccountServices.generate(repo.getNetwork())

    const result = {
      publicKey: newAccount.publicKey,
      privateKey: newAccount.privateKey,
      address: newAccount.address.plain(),
    }

    logger.info('New Account: ' + JSON.stringify(result, null, '  '))
  }
}
