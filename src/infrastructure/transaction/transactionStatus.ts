import RepositoryFactory from '../../service/RepositoryFactory'
import { ITransactionStatusOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import Constants from '../../constants'
import TransactionServices from '../../service/TransactionServices'
import { AggregateTransaction } from '@tech-bureau/symbol-sdk'
import { AggregateTransactionInfoDto, TransactionInfoDto } from '../../types/TransactionInfoDto'
import TransactionCheckServices from '../../service/TransactionCheckServices'
import AccountServices from '../../service/AccountServices'

const logger = LoggerFactory.getLogger()

export default async (option: ITransactionStatusOption) => {
  const { url, readfile, transactionhash, privatekey } = option

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
    const account = privatekey ? AccountServices.createAccount(privatekey, networkType) : undefined

    const statusTx = await TransactionServices.getTransactionStatus(mijinUrl, transactionhash)

    if (!statusTx.height) {
      logger.error(`Block not found.`)
      return
    }

    const statusTxMessage = `status: ${statusTx.group} block: ${statusTx.height?.compact()} hash: ${statusTx.hash}`
    logger.info(`Transaction Status: ${statusTxMessage}`)

    // When Confirmed, get Block date
    if (statusTx.group === 'confirmed') {
      const blockInfo = await TransactionServices.getBlock(mijinUrl, statusTx.height)
      const blockDate = new Date(blockInfo.timestamp.compact() + epoch * 1000).toLocaleString()
      logger.info(`Block Info: height: ${blockInfo.height.compact()} date: ${blockDate}`)
    }

    const getTx = await TransactionServices.getTransaction(mijinUrl, transactionhash, statusTx.group)

    let transactions = [] as TransactionInfoDto[]


    if (TransactionCheckServices.aggregateCheck(getTx)) {
      const aggregateTx = getTx as AggregateTransaction
      aggregateTx.innerTransactions.forEach((tx) => {
        transactions.push(TransactionCheckServices.format(tx, account))
      })
      const aggregateInfo = {
        type: Constants.TransactionType[getTx.type],
        network: Constants.NetworkType[getTx.networkType],
        aggregateSignerAddress: getTx.signer ? getTx.signer.address.plain() : '',
        transactions: transactions,
      } as AggregateTransactionInfoDto
      logger.info(`Aggregate Transaction Info: ${JSON.stringify(aggregateInfo, null, '  ')}`)
    } else {
      transactions.push(TransactionCheckServices.format(getTx, account))
      logger.info(`Single Transaction Info: ${JSON.stringify(transactions, null, '  ')}`)
    }
  } catch (error) {
    logger.error(`Error: ${error}`)
  }
}
