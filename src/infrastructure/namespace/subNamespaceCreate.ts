import AccountServices from '../../service/AccountServices'
import RepositoryFactory from '../../service/RepositoryFactory'
import { INamespaceCreateOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import TransactionServices from '../../service/TransactionServices'
import NamespaceServices from '../../service/NamespaceServices'

const logger = LoggerFactory.getLogger()

export default async (option: INamespaceCreateOption) => {
  const { owner, url, readfile, name, parentName, privatekey, bod } = option

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
    await repo.init(bod)
  } catch (error) {
    logger.error(`Please specify a valid URL: ${mijinUrl}`)
    return
  }

  const networkType = repo.getNetwork()
  const epoch = repo.getEpoch()

  logger.info(`mijin URL: ${mijinUrl}`)
  logger.info(`Network: ${networkType.toString()}`)

  logger.info('Create Sub Namespace...')

  let createAccount

  switch (owner) {
    case 'work':
      createAccount = configFile
        ? AccountServices.createAccount(configFile.workAccount.privateKey, networkType)
        : undefined
      break
    case 'balance':
      createAccount = configFile
        ? AccountServices.createAccount(configFile.balanceAccount.privateKey, networkType)
        : undefined
      break
    case 'main':
      createAccount = configFile
        ? AccountServices.createAccount(configFile.mainAccount.privateKey, networkType)
        : undefined
      break
    case 'test1':
      createAccount = configFile
        ? AccountServices.createAccount(configFile.test1Account.privateKey, networkType)
        : undefined
      break
    case 'test2':
      createAccount = configFile
        ? AccountServices.createAccount(configFile.test2Account.privateKey, networkType)
        : undefined
      break
    default:
      createAccount =
        privatekey && privatekey.length === 64 ? AccountServices.createAccount(privatekey, networkType) : undefined
      break
  }

  if (!createAccount) {
    logger.error('Create Account Not Found Set (-r config -o owner) or -p')
    return
  }

  if (!name) {
    logger.error('Namespace name Not Found Set -n option')
    return
  }

  if (!parentName) {
    logger.error('Namespace parentName Not Found Set -pn option')
    return
  }

  const minFeeMultiplier = repo.getTransactionFees().minFeeMultiplier
  const createsubNamespaceTransaction = NamespaceServices.createSubNamespace(
    epoch,
    name,
    parentName,
    networkType,
    minFeeMultiplier
  )
  if (!createsubNamespaceTransaction) {
    logger.error('invalid name option')
    return
  }

  logger.info(`Sub Namespace Owner Account: ${createAccount.address.plain()}`)
  logger.info(`Namespace Name: ${name}`)
  logger.info(`Namespace Parent Name: ${parentName}`)
  logger.info(`Namespace Transaction: ${JSON.stringify(createsubNamespaceTransaction)}`)
  const signedTransaction = createAccount.sign(createsubNamespaceTransaction, repo.getGnerationHash())

  logger.info(`Transaction Fee: ${repo.getTransactionFees().minFeeMultiplier}`)
  logger.info(
    `Namespace Rental Fee Per Block: ${repo.getNetworkProperties().plugins.namespace?.rootNamespaceRentalFeePerBlock}`
  )
  logger.info('Start Announce Transaction...')

  const announce = await TransactionServices.announce(
    signedTransaction,
    repo.createLitener(),
    repo.createTransactionRepository(),
    repo.createReceiptRepository()
  ).catch((err) => {
    return err
  })
  if (announce instanceof Error) {
    logger.error(`Namespace Announce ${announce}`)
    return
  }

  logger.info('End Transaction')
  logger.info(`${mijinUrl}/transactionStatus/${signedTransaction.hash}`)
  logger.info(`${mijinUrl}/transactions/confirmed/${signedTransaction.hash}`)
}
