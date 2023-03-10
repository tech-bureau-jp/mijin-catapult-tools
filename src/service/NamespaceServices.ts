import {
  UInt64,
  NamespaceRegistrationTransaction,
  Deadline,
  NetworkType,
  NamespaceId,
  NamespaceRepository,
  NamespaceInfo,
  AliasAction,
  AliasTransaction,
  MosaicId,
  Address,
} from '@tech-bureau/symbol-sdk'
import { firstValueFrom } from 'rxjs'

export default class NamespaceServices {
  constructor() {}

  static createRootNamespace(
    epoch: number,
    name: string,
    duration: number,
    networkType: NetworkType,
    feeMultiplier: number
  ) {
    // check name
    const namespace = this.getNamespaceId(name)
    if (!namespace) {
      return null
    }
    return NamespaceRegistrationTransaction.createRootNamespace(
      Deadline.create(epoch),
      name,
      UInt64.fromUint(duration),
      networkType
    ).setMaxFee(feeMultiplier)
  }

  static createSubNamespace(
    epoch: number,
    name: string,
    parentName: string,
    networkType: NetworkType,
    feeMultiplier: number
  ) {
    // check name and parent name
    const namespace = this.getNamespaceId(name)
    if (!namespace) {
      return null
    }
    const parentNamespace = this.getNamespaceId(parentName)
    if (!parentNamespace) {
      return null
    }
    return NamespaceRegistrationTransaction.createSubNamespace(
      Deadline.create(epoch),
      name,
      parentName,
      networkType
    ).setMaxFee(feeMultiplier)
  }

  static linkMosaic(
    epoch: number,
    namespaceId: string,
    mosaicId: string,
    networkType: NetworkType,
    feeMultiplier: number
  ) {
    const namespace = this.getNamespaceId(namespaceId)
    if (!namespace) {
      return null
    }
    let mosaic: MosaicId | null = null
    try {
      mosaic = new MosaicId(mosaicId)
    } catch {}
    if (!mosaic) {
      return null
    }
    const mosaicAliasTransaction = AliasTransaction.createForMosaic(
      Deadline.create(epoch),
      AliasAction.Link,
      namespace,
      mosaic,
      networkType
    ).setMaxFee(feeMultiplier) as AliasTransaction
    return mosaicAliasTransaction
  }

  static linkAddress(
    epoch: number,
    namespaceId: string,
    address: string,
    networkType: NetworkType,
    feeMultiplier: number
  ) {
    const namespace = this.getNamespaceId(namespaceId)
    if (!namespace) {
      return null
    }
    if (!Address.isValidRawAddress(address)) {
      return null
    }
    const addressObj = Address.createFromRawAddress(address)
    const addressAliasTransaction = AliasTransaction.createForAddress(
      Deadline.create(epoch),
      AliasAction.Link,
      namespace,
      addressObj,
      networkType
    ).setMaxFee(feeMultiplier)
    return addressAliasTransaction
  }

  static getNamespaceId(id: string) {
    let namespaceId: NamespaceId | null = null
    try {
      namespaceId = new NamespaceId(id)
    } catch {}
    try {
      namespaceId = NamespaceId.createFromEncoded(id)
    } catch {}
    return namespaceId
  }

  static async getNamespace(namespaceId: string, namespaceRepository: NamespaceRepository) {
    const convertedNamespaceId = this.getNamespaceId(namespaceId)
    if (!convertedNamespaceId) {
      return null
    }
    const namespaceInfo = await firstValueFrom(namespaceRepository.getNamespace(convertedNamespaceId)).catch(() => null)
    return namespaceInfo
  }
  static namespaceInfo(namespaceInfo: NamespaceInfo) {
    return {
      active: namespaceInfo.active,
      ownerAddress: namespaceInfo.ownerAddress.plain(),
      namespaceId: namespaceInfo.id.toHex(),
      parentId: namespaceInfo.parentId.toHex(),
      aliasMosaicId: namespaceInfo.alias.mosaicId?.toHex(),
      aliasAddress: namespaceInfo.alias.address?.plain(),
    }
  }
}
