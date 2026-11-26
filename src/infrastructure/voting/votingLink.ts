import { IVotingLinkOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import RepositoryFactory from '../../service/RepositoryFactory'
import AccountServices from '../../service/AccountServices'
import TransactionServices from '../../service/TransactionServices'
import { VotingUtils } from '../../service/VotingServices'
import { checkVotingKeyLink, parseChainNumber, selectLatestVotingFile } from '../../service/VotingLinkServices'
import { readConfig, checkFile } from '../../utils'

const logger = LoggerFactory.getLogger()

export default async (option: IVotingLinkOption) => {
  const { url, readfile, savedir, privatekey, bod } = option

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

  const mainPrivateKey = privatekey ? privatekey : configFile ? configFile.mainAccount.privateKey : undefined

  if (!mainPrivateKey || mainPrivateKey.length !== 64) {
    logger.error('Main Account Private Key Not Found Set (-r config.json) or -p')
    return
  }

  const mainAccount = AccountServices.createAccount(mainPrivateKey, networkType)

  const dir = savedir === 'current' ? process.cwd() : savedir

  logger.info('Start Voting Key Link...')

  let votingFile
  try {
    votingFile = selectLatestVotingFile(new VotingUtils().loadVotingFiles(dir))
  } catch (error) {
    logger.error(`Voting Key file Read: FAILED ${dir} ${error}`)
    return
  }

  if (!votingFile) {
    logger.error(`Voting Key file Not Found: ${dir}`)
    return
  }

  logger.info(`Voting Key file: ${dir}/${votingFile.filename}`)
  logger.info(`Voting Public Key: ${votingFile.publicKey}`)
  logger.info(`votingStartEpoch: ${votingFile.startEpoch}`)
  logger.info(`votingEndEpoch: ${votingFile.endEpoch}`)

  let accountInfo
  try {
    accountInfo = await AccountServices.addressInfo(mainAccount.address, repo.createAccountRepository())
  } catch (error) {
    logger.error(`Main Account Not Found on chain: ${mainAccount.address.plain()}`)
    return
  }

  const linkedVotingKeys = accountInfo.supplementalPublicKeys.voting ?? []
  logger.info(`Main Account: ${mainAccount.address.plain()}`)
  linkedVotingKeys.forEach((v, i) => {
    logger.info(`Linked Voting Key: index${i}: ${v.publicKey} (epoch ${v.startEpoch} - ${v.endEpoch})`)
  })

  const chain = repo.getNetworkProperties().chain
  const limits = {
    maxLinks: parseChainNumber(chain.maxVotingKeysPerAccount, 3),
    minLifetime: parseChainNumber(chain.minVotingKeyLifetime, 72),
    maxLifetime: parseChainNumber(chain.maxVotingKeyLifetime, 26280),
  }

  const reason = checkVotingKeyLink(votingFile, linkedVotingKeys, limits)
  if (reason) {
    logger.error(`Voting Key Link Not Announced: ${reason}`)
    return
  }

  const finalizationEpoch = repo.getEinalizationEpoch()
  if (votingFile.startEpoch <= finalizationEpoch) {
    logger.warn(
      `Start epoch ${votingFile.startEpoch} is not after the finalized epoch ${finalizationEpoch}. Epochs that have already passed will not be used for voting.`
    )
  }

  const votingKeyLinkTransaction = TransactionServices.createVotingKey(
    epoch,
    votingFile.publicKey,
    votingFile.startEpoch,
    votingFile.endEpoch,
    networkType
  ).setMaxFee(repo.getTransactionFees().minFeeMultiplier)

  const signedTransaction = mainAccount.sign(votingKeyLinkTransaction, repo.getGnerationHash())

  logger.info(`Transaction Fee: ${repo.getTransactionFees().minFeeMultiplier}`)
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
    logger.error(`Voting Key Link Announce ${announce}`)
    return
  }

  logger.info('End Transaction')
  logger.info(`${mijinUrl}/transactionStatus/${signedTransaction.hash}`)
  logger.info(`${mijinUrl}/transactions/confirmed/${signedTransaction.hash}`)
}
