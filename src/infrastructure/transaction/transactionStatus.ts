import RepositoryFactory from '../../service/RepositoryFactory'
import { ITransactionStatusOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import TransactionServices from '../../service/TransactionServices'

const logger = LoggerFactory.getLogger()

export default async (option: ITransactionStatusOption) => {
  const { url, readfile, transactionhash } = option

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

  if (!transactionhash || transactionhash.length !== 64) {
    logger.error('Transation Hash is wrong(64 length). -t [transactionHash]')
    return
  }

  try {
    const statusTx = await TransactionServices.getTransactionStatus(mijinUrl, transactionhash)

    logger.info(`Transaction Status: ${JSON.stringify(statusTx, null, '  ')}`)

    const getTx = await TransactionServices.getTransaction(mijinUrl, transactionhash, statusTx.group)

    logger.info(`Transaction Info: ${JSON.stringify(getTx, null, '  ')}`)
  } catch (error) {
    logger.error(`Error: ${error}`)
  }
}
