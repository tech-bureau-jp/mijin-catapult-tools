import AccountServices from '../../service/AccountServices'
import RepositoryFactory from '../../service/RepositoryFactory'
import TransactionServices from '../../service/TransactionServices'
import MosaicServices from '../../service/MosaicServices'
import MessageServices from '../../service/MessageServices'
import { ITransferOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'

const logger = LoggerFactory.getLogger()

export default async (option: ITransferOption) => {
  const { url, from, dest, readfile, amount, mosaic, message, bod } = option

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

  logger.info('Start Transfer Account...')

  let fromAccount
  let destAccount

  switch (from) {
    case 'work':
      fromAccount = configFile
        ? AccountServices.createAccount(configFile.workAccount.privateKey, repo.getNetwork())
        : undefined
      break
    case 'balance':
      fromAccount = configFile
        ? configFile.balanceAccount.privateKey
          ? AccountServices.createAccount(configFile.balanceAccount.privateKey, repo.getNetwork())
          : undefined
        : undefined
      break
    case 'main':
      fromAccount = configFile
        ? AccountServices.createAccount(configFile.mainAccount.privateKey, repo.getNetwork())
        : undefined
      break
    case 'test1':
      fromAccount = configFile
        ? AccountServices.createAccount(configFile.test1Account.privateKey, repo.getNetwork())
        : undefined
      break
    case 'test2':
      fromAccount = configFile
        ? AccountServices.createAccount(configFile.test2Account.privateKey, repo.getNetwork())
        : undefined
      break
    default:
      if (!from || (from && from.length !== 64)) {
        logger.error(`Custom From Account Not Found`)
        return
      }
      fromAccount = AccountServices.createAccount(from, repo.getNetwork())
      break
  }

  if (fromAccount === undefined) {
    logger.error(`From Account Not Found`)
    return
  }

  switch (dest) {
    case 'work':
      destAccount = configFile ? AccountServices.createAddress(configFile.workAccount.address) : undefined
      break
    case 'balance':
      destAccount = configFile
        ? configFile.balanceAccount.address
          ? AccountServices.createAddress(configFile.balanceAccount.address)
          : undefined
        : undefined
      break
    case 'main':
      destAccount = configFile ? AccountServices.createAddress(configFile.mainAccount.address) : undefined
      break
    case 'test1':
      destAccount = configFile ? AccountServices.createAddress(configFile.test1Account.address) : undefined
      break
    case 'test2':
      destAccount = configFile ? AccountServices.createAddress(configFile.test2Account.address) : undefined
      break
    default:
      if (!dest || (dest && dest.length !== 39)) {
        logger.error(`Custom Dest Account Not Found`)
        return
      }
      destAccount = AccountServices.createAddress(dest)
      break
  }

  if (destAccount === undefined) {
    logger.error(`Dest Account Not Found`)
    return
  }

  logger.info(`From Account Address: ${fromAccount.address.plain()}`)
  logger.info(`Dest Account Address: ${destAccount.plain()}`)

  const mosaics = []

  if (mosaic === 'cat.currency') {
    const currencyAmount =
      Number(Number(amount).toFixed(repo.getCurrency().currency.divisibility)) *
      Math.pow(10, repo.getCurrency().currency.divisibility)
    logger.info(`Currecny Amount: ${currencyAmount}`)
    mosaics.push(MosaicServices.createCurencyToAbsolute(repo.getCurrency().currency, currencyAmount))
  } else {
    if (mosaic.length !== 16) {
      logger.error('Not Mosaic Id')
      return
    }
    mosaics.push(MosaicServices.create(mosaic, Number(amount)))
  }

  const transferMessage = MessageServices.createPlain(message ? message : '')

  const transferTransaction = TransactionServices.createTransfer(
    epoch,
    destAccount,
    mosaics,
    transferMessage,
    repo.getNetwork()
  ).setMaxFee(repo.getTransactionFees().minFeeMultiplier)

  const signedTransaction = fromAccount.sign(transferTransaction, repo.getGnerationHash())

  logger.info('Start Transfer Transaction...')

  const announce = await TransactionServices.announce(
    signedTransaction,
    repo.createLitener(),
    repo.createTransactionRepository(),
    repo.createReceiptRepository()
  ).catch((error) => error)

  if (announce instanceof Error) {
    logger.error(`Transfer Announce ${announce}`)
    return
  }

  logger.info('End Transfer Transaction')
  logger.info(`${mijinUrl}/transactionStatus/${signedTransaction.hash}`)
  logger.info(`${mijinUrl}/transactions/confirmed/${signedTransaction.hash}`)
}
