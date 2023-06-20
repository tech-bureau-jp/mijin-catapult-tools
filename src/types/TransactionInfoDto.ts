export interface AggregateTransactionInfoDto {
  type: string
  network: string
  aggregateSignerAddress: string
  transactions: TransactionInfoDto[]
  date?: string
  maxFee?: string
}

export interface TransactionInfoDto {
  type: any
  network: string
  signerAddress: string
  date?: string
  recipientAddress?: string
  mosaics?: MosaicInfoDto[]
  message?: string
  maxFee?: number
  txInfo?: any
  mosaicDifinition?: MosaicDefinitionDto
  mosaicAlias?: MosaicAliasDto
  mosaicSupplyChange?: MosaicSupplyChangeDto
  mosaicMetadata?: MosaicMetadataDto
  accountAddressRestriction?: AccountAddressRestrictionDto
  accountOperationRestriction?: AccountOperationRestrictionDto
  namespaceRegistration?: NamespaceRegistrationDto
  namespaceMetadata?: NamespaceMetadataDto
  hashLock?: HashLockDto
  secretLock?: SecretLockDto
  secretProof?: SecretProofDto
  accountMetadata?: AccountMetadataDto
  multisigAccountModification?: MultisigAccountModificationDto
  addressAlias?: AddressAliasDto
  mosaicGlobalRestriction?: MosaicGlobalRestrictionDto
}

export interface MosaicInfoDto {
  mosaicId: string
  namespace?: string
  amount: number
}

export interface MosaicDefinitionDto {
  mosaicId: string
  divisibility: number
  duration: number
  flags: {
    transferable: boolean
    supplyMutable: boolean
    restrictable: boolean
    revokable: boolean
  }
}

export interface MosaicAliasDto {
  mosaicId: string
  namespaceId: string
  alias: string
}

export interface MosaicSupplyChangeDto {
  mosaicId: string
  delta: number
}

export interface MosaicMetadataDto {
  mosaicId: string
  metadataKey: string
  metadataValue: string
}

export interface AccountAddressRestrictionDto {
  restrictionFlags: string
  restrictionAdditions: string[]
  restrictionDeletions: string[]
}

export interface AccountOperationRestrictionDto {
  restrictionFlags: string
  restrictionAdditions: string[]
  restrictionDeletions: string[]
}

export interface NamespaceRegistrationDto {
  name: string
  namespaceId: string
  parentId: string
  duration: number
  registrationType: string
}

export interface NamespaceMetadataDto {
  namespaceId: string
  metadataKey: string
  metadataValue: string
}

export interface HashLockDto {
  hash: string
  duration: number
}

export interface SecretLockDto {
  secret: string
  hashAlgorithm: string
  duration: number
  recipientAddress: string
}

export interface SecretProofDto {
  secret: string
  proof: string
  hashAlgorithm: string
  recipientAddress: string
}

export interface AccountMetadataDto {
  targetAddress: string
  metadataKey: string
  metadataValue: string
}

export interface MultisigAccountModificationDto {
  minApprovalDelta: number
  minRemovalDelta: number
  addressAdditions: string[]
  addressDeletions: string[]
}

export interface AddressAliasDto {
  address: string
  namespaceId: string
  aliasAction: string
}

export interface MosaicGlobalRestrictionDto {
  mosaicId: string
  referenceMosaicId: string
  restrictionKey: string
  previousRestrictionValue: number
  newRestrictionValue: number
  previousRestrictionType: string
  newRestrictionType: string
}
