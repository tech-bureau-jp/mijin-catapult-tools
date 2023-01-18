import {
  Account,
  AccountInfo,
  AccountRepository,
  Address,
  NetworkCurrencies,
  NetworkType,
  PublicAccount,
} from '@tech-bureau/symbol-sdk'
import { Observable, firstValueFrom } from 'rxjs'

export default class AccountServices {
  constructor() {}

  static generate(networkType: NetworkType): Account {
    return Account.generateNewAccount(networkType)
  }

  static createPublicAccount(publicKey: string, networkType: NetworkType): PublicAccount {
    return PublicAccount.createFromPublicKey(publicKey, networkType)
  }

  static createAccount(privateKey: string, networkType: NetworkType) {
    return Account.createFromPrivateKey(privateKey, networkType)
  }

  static createAddress(address: string) {
    return Address.createFromRawAddress(address)
  }

  static createPublicAccountArray(publicKeys: string[], networkType: NetworkType) {
    return publicKeys.map((publicKey) => PublicAccount.createFromPublicKey(publicKey, networkType).address)
  }

  static async addressInfo(address: Address, accountRepository: AccountRepository) {
    try {
      return await firstValueFrom(accountRepository.getAccountInfo(address))
    } catch (error) {
      throw new Error(`Address Not Found`)
    }
  }

  static accountInfo(account: AccountInfo, currency: NetworkCurrencies) {
    const mosaics = account.mosaics.map((mosaic) => {
      return {
        id: mosaic.id.toHex(),
        amount: mosaic.amount.toString(),
        currency: currency.currency.mosaicId?.equals(mosaic.id),
        harvest: currency.harvest.mosaicId?.equals(mosaic.id),
      }
    })
    return {
      publicKey: account.publicKey,
      address: account.address.plain(),
      mosaics: mosaics,
      keylink: {
        vrf: {
          publicKey: account.supplementalPublicKeys.vrf ? account.supplementalPublicKeys.vrf.publicKey : '',
        },
        voting: {
          publicKey: account.supplementalPublicKeys.voting ? account.supplementalPublicKeys.voting[0].publicKey : '',
          startEpoch: account.supplementalPublicKeys.voting ? account.supplementalPublicKeys.voting[0].startEpoch : '',
          endEpoch: account.supplementalPublicKeys.voting ? account.supplementalPublicKeys.voting[0].endEpoch : '',
        },
      },
    }
  }
}
