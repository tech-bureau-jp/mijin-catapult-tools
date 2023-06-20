import {
  TransactionType,
  MosaicSupplyChangeAction,
  NamespaceRegistrationType,
  AliasAction,
  LinkAction,
  AccountType,
  AccountKeyTypeFlags,
  NetworkType,
  OperationRestrictionFlag,
  AddressRestrictionFlag,
  MosaicRestrictionFlag,
  LockHashAlgorithm,
  MosaicRestrictionType,
} from '@tech-bureau/symbol-sdk'

interface ConstrantsType {
  [key: number]: string
}

class Constants {
  static TransactionType: ConstrantsType = {
    [TransactionType.TRANSFER]: 'Transfer',
    [TransactionType.NAMESPACE_REGISTRATION]: 'Namespace Registration',
    [TransactionType.ADDRESS_ALIAS]: 'Address Alias',
    [TransactionType.MOSAIC_ALIAS]: 'Mosaic Alias',
    [TransactionType.MOSAIC_DEFINITION]: 'Mosaic Definition',
    [TransactionType.MOSAIC_SUPPLY_CHANGE]: 'Mosaic Supply Change',
    [TransactionType.MULTISIG_ACCOUNT_MODIFICATION]: 'Multisig Account Modification',
    [TransactionType.AGGREGATE_COMPLETE]: 'Aggregate Complete',
    [TransactionType.AGGREGATE_BONDED]: 'Aggregate Bonded',
    [TransactionType.HASH_LOCK]: 'Hash Lock',
    [TransactionType.SECRET_LOCK]: 'Secret Lock',
    [TransactionType.SECRET_PROOF]: 'Secret Proof',
    [TransactionType.ACCOUNT_ADDRESS_RESTRICTION]: 'Account Address Restriction',
    [TransactionType.ACCOUNT_MOSAIC_RESTRICTION]: 'Account Mosaic Restriction',
    [TransactionType.ACCOUNT_OPERATION_RESTRICTION]: 'Account Operation Restriction',
    [TransactionType.ACCOUNT_KEY_LINK]: 'Account Key Link',
    [TransactionType.MOSAIC_ADDRESS_RESTRICTION]: 'Mosaic Address Restriction',
    [TransactionType.MOSAIC_GLOBAL_RESTRICTION]: 'Mosaic Global Restriction',
    [TransactionType.ACCOUNT_METADATA]: 'Account Metadata',
    [TransactionType.MOSAIC_METADATA]: 'Mosaic Metadata',
    [TransactionType.NAMESPACE_METADATA]: 'Namespace Metadata',
    [TransactionType.VRF_KEY_LINK]: 'VRF Key Link',
    [TransactionType.VOTING_KEY_LINK]: 'Voting Key Link',
    [TransactionType.NODE_KEY_LINK]: 'Node Key Link',
  }

  static NetworkType: ConstrantsType = {
    [NetworkType.MAIN_NET]: 'MAINNET',
    [NetworkType.MIJIN]: 'MIJIN',
    [NetworkType.MIJIN_TEST]: 'MIJIN TESTNET',
    [NetworkType.TEST_NET]: 'TESTNET',
  }

  static MosaicSupplyChangeAction: ConstrantsType = {
    [MosaicSupplyChangeAction.Increase]: 'Increase',
    [MosaicSupplyChangeAction.Decrease]: 'Decrease',
  }

  static NamespaceRegistrationType: ConstrantsType = {
    [NamespaceRegistrationType.RootNamespace]: 'rootNamespace',
    [NamespaceRegistrationType.SubNamespace]: 'Sub Namespace',
  }

  static AliasAction: ConstrantsType = {
    [AliasAction.Link]: 'Link',
    [AliasAction.Unlink]: 'Unlink',
  }

  static LinkAction: ConstrantsType = {
    [LinkAction.Link]: 'Link',
    [LinkAction.Unlink]: 'Unlink',
  }

  static AccountType: ConstrantsType = {
    [AccountType.Unlinked]: 'Unlinked',
    [AccountType.Main]: 'Main',
    [AccountType.Remote]: 'Remote',
    [AccountType.Remote_Unlinked]: 'Remote Unlinked',
  }

  static AccountKeyTypeFlags: ConstrantsType = {
    [AccountKeyTypeFlags.Unset]: 'Unset',
    [AccountKeyTypeFlags.Linked]: 'Linked',
    [AccountKeyTypeFlags.VRF]: 'VRF',
    [AccountKeyTypeFlags.Node]: 'Node',
    [AccountKeyTypeFlags.All]: 'All',
  }

  static OperationRestrictionFlag: ConstrantsType = {
    [OperationRestrictionFlag.AllowOutgoingTransactionType]: 'Allow Outgoing Transaction',
    [OperationRestrictionFlag.BlockOutgoingTransactionType]: 'Block Outgoing Transaction',
  }

  static AddressRestrictionFlag: ConstrantsType = {
    [AddressRestrictionFlag.AllowIncomingAddress]: 'Allow Incoming Address',
    [AddressRestrictionFlag.BlockIncomingAddress]: 'Block Incoming Address',
    [AddressRestrictionFlag.AllowOutgoingAddress]: 'Allow Outgoing Address',
    [AddressRestrictionFlag.BlockOutgoingAddress]: 'Block Outgoing Address',
  }

  static MosaicRestrictionFlag: ConstrantsType = {
    [MosaicRestrictionFlag.AllowMosaic]: 'Allow Mosaic',
    [MosaicRestrictionFlag.BlockMosaic]: 'Block Mosaic',
  }

  static MosaicRestrictionType: ConstrantsType = {
    [MosaicRestrictionType.EQ]: 'Allow Equal',
    [MosaicRestrictionType.NE]: 'Not Equal',
    [MosaicRestrictionType.LT]: 'Rather Than',
    [MosaicRestrictionType.GT]: 'Gather Than',
    [MosaicRestrictionType.NONE]: 'NONE',
  }

  static HashAlgorithmType: ConstrantsType = {
    [LockHashAlgorithm.Op_Hash_160]: 'HASH_160',
    [LockHashAlgorithm.Op_Sha3_256]: 'SHA3_256',
    [LockHashAlgorithm.Op_Hash_256]: 'HASH_256',
  }
}

export default Constants
