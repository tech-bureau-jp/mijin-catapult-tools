import AccountServices from '../../service/AccountServices'
import RepositoryFactory from '../../service/RepositoryFactory'
import { IMosaicCreateOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import TransactionServices from '../../service/TransactionServices'
import MosaicServices from '../../service/MosaicServices'

const logger = LoggerFactory.getLogger()

export default async (option: IMosaicCreateOption) => {
  const {
    owner,
    url,
    readfile,
    supply,
    divisibility,
    supplymutable,
    transferable,
    restrictable,
    revokable,
    privatekey,
  } = option

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

  logger.info('Create Mosaic...')

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

  const mosaicNonce = MosaicServices.createMosaicNonce()
  const mosaicId = MosaicServices.createMosaicId(mosaicNonce, createAccount.address)
  const mosaicFlag = MosaicServices.createMosaicFlags(
    JSON.parse(supplymutable),
    JSON.parse(transferable),
    JSON.parse(restrictable),
    JSON.parse(revokable)
  )

  const mosaicSupply = Number(Number(supply).toFixed(Number(divisibility))) * Math.pow(10, Number(divisibility))

  logger.info(`Mosaic Owener Account: ${createAccount.address.plain()}`)
  logger.info(`MosaicId: ${mosaicId.id.toHex()}`)
  logger.info(
    `Mosaic Flags: supplymutable:${supplymutable}, transferable:${transferable}, restrictable:${restrictable}, revokable:${revokable}, mosaicFlag: ${mosaicFlag.getValue()}`
  )
  logger.info(`Mosaic Supply: divisibility:${divisibility}, supply:${mosaicSupply}`)

  const mosaicDefinitionTransaction = TransactionServices.createMosaicDefinition(
    epoch,
    mosaicNonce,
    mosaicId,
    mosaicFlag,
    Number(divisibility),
    networkType
  )

  const mosaicSupplyChangeTransaction = TransactionServices.createMosaicSupplyChange(
    epoch,
    mosaicId,
    mosaicSupply,
    networkType
  )

  const aggregateCompleteTransaction = TransactionServices.createComplete(
    epoch,
    [
      mosaicDefinitionTransaction.toAggregate(createAccount.publicAccount),
      mosaicSupplyChangeTransaction.toAggregate(createAccount.publicAccount),
    ],
    networkType
  ).setMaxFeeForAggregate(repo.getTransactionFees().minFeeMultiplier, 0)

  const signedTransaction = createAccount.sign(aggregateCompleteTransaction, repo.getGnerationHash())

  logger.info(`Transaction Fee: ${repo.getTransactionFees().minFeeMultiplier}`)
  logger.info(`Mosaic Rental Fee: ${repo.getNetworkProperties().plugins.mosaic?.mosaicRentalFee}`)
  logger.info('Start Aggregate Transaction...')

  const announce = await TransactionServices.announce(
    signedTransaction,
    repo.createLitener(),
    repo.createTransactionRepository(),
    repo.createReceiptRepository()
  )

  logger.info('End Aggregate Transaction')
  logger.info(`${mijinUrl}/transactionStatus/${signedTransaction.hash}`)
  logger.info(`${mijinUrl}/transactions/confirmed/${signedTransaction.hash}`)
}
