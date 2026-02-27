import {
  ChainInfo,
  FinalizationProof,
  NetworkConfiguration,
  NetworkCurrencies,
  NetworkType,
  RepositoryFactoryHttp,
  TransactionFees,
} from '@tech-bureau/symbol-sdk'
import { firstValueFrom } from 'rxjs'
import fetchCookie from 'fetch-cookie'
import { CookieJar } from 'tough-cookie'
import { ProxyAgent } from 'undici'

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

  async init(cookieFlag?: boolean) {
    const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.https_proxy
    const dispatcher = proxyUrl ? new ProxyAgent({ uri: proxyUrl, requestTls: { rejectUnauthorized: false } }) : undefined
    
    const customFetch = dispatcher
      ? (url: any, init?: any) => {
          const headers = { ...init?.headers }
          delete headers['x-forwarded-for']
          delete headers['X-Forwarded-For']
          return fetch(url, { ...init, headers, dispatcher })
        }
      : fetch

    const websocketInjected = proxyUrl ? {
      agent: dispatcher,
      headers: {}
    } : undefined

    if (cookieFlag) {
      const cookieJar = new CookieJar()
      const fetchCookieJar = fetchCookie(customFetch, cookieJar)
      await fetchCookieJar(this.url)
      const cookie = await cookieJar.getCookieString(this.url)

      const websocketOptions = {
        headers: { cookie: cookie },
        ...(websocketInjected || {})
      }

      repo = new RepositoryFactoryHttp(this.url, {
        fetchApi: fetchCookieJar,
        websocketOptions: websocketOptions,
      })
    } else {
      repo = new RepositoryFactoryHttp(this.url, dispatcher ? { 
        fetchApi: customFetch,
        websocketInjected: websocketInjected 
      } : undefined)
    }

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

  createTransactionStatusRepository() {
    return repo.createTransactionStatusRepository()
  }
}
