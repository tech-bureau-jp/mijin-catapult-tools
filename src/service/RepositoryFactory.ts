import {
  ChainInfo,
  FinalizationProof,
  NetworkConfiguration,
  NetworkCurrencies,
  NetworkType,
  RepositoryFactoryHttp,
  TransactionFees,
} from '@tech-bureau-jp/symbol-sdk'
import { firstValueFrom } from 'rxjs'

let networkType: NetworkType
let currency: NetworkCurrencies
let generationHash: string
let epoch: number
let repo: RepositoryFactoryHttp
let tfees: TransactionFees
let networkProperties: NetworkConfiguration
let finalizationEpoch: number

export default class RepositoryFactory {
  constructor(public url: string) {}

  async init() {
    repo = new RepositoryFactoryHttp(this.url)
    networkType = await firstValueFrom(repo.getNetworkType())
    currency = await firstValueFrom(repo.getCurrencies())
    generationHash = await firstValueFrom(repo.getGenerationHash())
    epoch = await firstValueFrom(repo.getEpochAdjustment())
    tfees = await firstValueFrom(repo.createNetworkRepository().getTransactionFees())
    networkProperties = await firstValueFrom(this.createNetwork().getNetworkProperties())
    finalizationEpoch = (await firstValueFrom(this.createChainRepository().getChainInfo())).latestFinalizedBlock
      .finalizationEpoch
  }

  getNetwork() {
    return networkType
  }

  getCurrency() {
    return currency
  }

  getGnerationHash() {
    return generationHash
  }

  getEpoch() {
    return epoch
  }

  getEinalizationEpoch() {
    return finalizationEpoch
  }

  getTransactionFees() {
    return tfees
  }

  getNetworkProperties() {
    return networkProperties
  }

  createNetwork() {
    return repo.createNetworkRepository()
  }

  createLitener() {
    return repo.createListener()
  }

  createTransactionRepository() {
    return repo.createTransactionRepository()
  }

  createReceiptRepository() {
    return repo.createReceiptRepository()
  }

  createAccountRepository() {
    return repo.createAccountRepository()
  }

  createNamespaceRepository() {
    return repo.createNamespaceRepository()
  }

  createMultisigRepository() {
    return repo.createMultisigRepository()
  }

  createFinalizationRepository() {
    return repo.createFinalizationRepository()
  }

  createBlockRepository() {
    return repo.createBlockRepository()
  }

  createChainRepository() {
    return repo.createChainRepository()
  }

  createMosaicRepository() {
    return repo.createMosaicRepository()
  }
}
