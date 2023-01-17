import {
  Currency,
  Mosaic,
  MosaicId,
  UInt64,
  MosaicNonce,
  Address,
  MosaicFlags,
  MosaicRepository,
  MosaicInfo,
} from '@tech-bureau-jp/symbol-sdk'
import { Observable, firstValueFrom } from 'rxjs'

export default class MosaicServices {
  constructor() {}

  static create(mosaicId: string, amount: number) {
    return new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(amount))
  }

  static createCurencyToAbsolute(currency: Currency, amount: number) {
    return currency.createAbsolute(amount)
  }

  static createCurencyToRelative(currency: Currency, amount: number) {
    return currency.createRelative(amount)
  }

  static createMosaicId(nonce: MosaicNonce, address: Address) {
    return MosaicId.createFromNonce(nonce, address)
  }

  static createMosaicNonce() {
    return MosaicNonce.createRandom()
  }

  static createMosaicFlags(
    supplyMutable: boolean,
    transferable: boolean,
    restrictable?: boolean | undefined,
    revokable?: boolean | undefined
  ) {
    return MosaicFlags.create(supplyMutable, transferable, restrictable, revokable)
  }

  static async getMosaic(mosaicId: string, mosaicRepository: MosaicRepository) {
    try {
      return await firstValueFrom(mosaicRepository.getMosaic(new MosaicId(mosaicId)))
    } catch (error) {
      throw new Error(`Mosaic Not Found`)
    }
  }

  static mosaicInfo(mosaicInfo: MosaicInfo) {
    return {
      ownerAddress: mosaicInfo.ownerAddress.plain(),
      mosaicId: mosaicInfo.id.toHex(),
      supply: mosaicInfo.supply.compact(),
      divisibility: mosaicInfo.divisibility,
    }
  }
}
