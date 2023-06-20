import {
  AccountAddressRestrictionTransaction,
  AccountOperationRestrictionTransaction,
  Convert,
  HashLockTransaction,
  MosaicAliasTransaction,
  MosaicDefinitionTransaction,
  MosaicMetadataTransaction,
  MosaicSupplyChangeTransaction,
  MultisigAccountModificationTransaction,
  NamespaceMetadataTransaction,
  NamespaceRegistrationTransaction,
  SecretLockTransaction,
  SecretProofTransaction,
  Transaction,
  TransactionType,
  TransferTransaction,
  MessageType,
  Account,
  AddressAliasTransaction,
  MosaicGlobalRestrictionTransaction,
} from '@tech-bureau/symbol-sdk'
import { TransactionInfoDto } from '../types/TransactionInfoDto'
import Constants from '../constants'
import MessageServices from './MessageServices'
import AccountServices from './AccountServices'

export default class TransactionCheckServicesServices {
  constructor() {}

  static aggregateCheck(tx: Transaction): boolean {
    return tx.type === TransactionType.AGGREGATE_COMPLETE || tx.type === TransactionType.AGGREGATE_BONDED ? true : false
  }

  static format(tx: Transaction, account?: Account): TransactionInfoDto {
    const defaultTx = {
      type: Constants.TransactionType[tx.type],
      network: Constants.NetworkType[tx.networkType],
      signerAddress: tx.signer ? tx.signer?.address.plain() : '',
    }

    if (tx.type === TransactionType.TRANSFER) {
      const transferTx = tx as TransferTransaction
      return {
        ...defaultTx,
        mosaics: transferTx.mosaics.map((mosaic) => {
          return { mosaicId: mosaic.id.toHex(), amount: mosaic.amount.compact() }
        }),
        message: transferTx.message
          ? transferTx.message.type === MessageType.EncryptedMessage && account && transferTx.signer
            ? MessageServices.createDecrypt(
                transferTx.message,
                AccountServices.createPublicAccount(transferTx.signer.publicKey, transferTx.networkType),
                account
              ).payload
            : transferTx.message.payload
          : '',
      }
    } else if (tx.type === TransactionType.MOSAIC_DEFINITION) {
      const mosaicDefinitionTx = tx as MosaicDefinitionTransaction
      return {
        ...defaultTx,
        mosaicDifinition: {
          mosaicId: mosaicDefinitionTx.mosaicId.toHex(),
          divisibility: mosaicDefinitionTx.divisibility,
          duration: mosaicDefinitionTx.duration.compact(),
          flags: {
            transferable: mosaicDefinitionTx.flags.transferable,
            supplyMutable: mosaicDefinitionTx.flags.supplyMutable,
            restrictable: mosaicDefinitionTx.flags.restrictable,
            revokable: mosaicDefinitionTx.flags.revokable,
          },
        },
      }
    } else if (tx.type === TransactionType.MOSAIC_ALIAS) {
      const mosaicAliasTx = tx as MosaicAliasTransaction
      return {
        ...defaultTx,
        mosaicAlias: {
          mosaicId: mosaicAliasTx.mosaicId.toHex(),
          namespaceId: mosaicAliasTx.namespaceId.toHex(),
          alias: Constants.AliasAction[mosaicAliasTx.aliasAction],
        },
      }
    } else if (tx.type === TransactionType.MOSAIC_SUPPLY_CHANGE) {
      const mosaicSupplyChangeTx = tx as MosaicSupplyChangeTransaction
      return {
        ...defaultTx,
        mosaicSupplyChange: {
          mosaicId: mosaicSupplyChangeTx.mosaicId.toHex(),
          delta: mosaicSupplyChangeTx.delta.compact(),
        },
      }
    } else if (tx.type === TransactionType.MOSAIC_METADATA) {
      const mosaicMetadataTx = tx as MosaicMetadataTransaction
      return {
        ...defaultTx,
        mosaicMetadata: {
          mosaicId: mosaicMetadataTx.targetMosaicId.toHex(),
          metadataKey: mosaicMetadataTx.scopedMetadataKey.toHex(),
          metadataValue: Convert.uint8ToUtf8(mosaicMetadataTx.value),
        },
      }
    } else if (tx.type === TransactionType.ACCOUNT_METADATA) {
      const accountMetadataTx = tx as MosaicMetadataTransaction
      return {
        ...defaultTx,
        accountMetadata: {
          targetAddress: accountMetadataTx.targetAddress.plain(),
          metadataKey: accountMetadataTx.scopedMetadataKey.toHex(),
          metadataValue: Convert.uint8ToUtf8(accountMetadataTx.value),
        },
      }
    } else if (tx.type === TransactionType.ACCOUNT_ADDRESS_RESTRICTION) {
      const accountAddressRestrictionTx = tx as AccountAddressRestrictionTransaction
      return {
        ...defaultTx,
        accountAddressRestriction: {
          restrictionFlags: Constants.AddressRestrictionFlag[accountAddressRestrictionTx.restrictionFlags],
          restrictionAdditions: accountAddressRestrictionTx.restrictionAdditions
            ? accountAddressRestrictionTx.restrictionAdditions.map((addition) => addition.plain())
            : [],
          restrictionDeletions: accountAddressRestrictionTx.restrictionDeletions
            ? accountAddressRestrictionTx.restrictionDeletions.map((deletion) => deletion.plain())
            : [],
        },
      }
    } else if (tx.type === TransactionType.ACCOUNT_OPERATION_RESTRICTION) {
      const accountOperationRestrictionTx = tx as AccountOperationRestrictionTransaction
      return {
        ...defaultTx,
        accountOperationRestriction: {
          restrictionFlags: Constants.OperationRestrictionFlag[accountOperationRestrictionTx.restrictionFlags],
          restrictionAdditions: accountOperationRestrictionTx.restrictionAdditions
            ? accountOperationRestrictionTx.restrictionAdditions.map((addition) => Constants.TransactionType[addition])
            : [],
          restrictionDeletions: accountOperationRestrictionTx.restrictionDeletions
            ? accountOperationRestrictionTx.restrictionDeletions.map((deletion) => Constants.TransactionType[deletion])
            : [],
        },
      }
    } else if (tx.type === TransactionType.NAMESPACE_REGISTRATION) {
      const namespaceRegistrationTx = tx as NamespaceRegistrationTransaction
      return {
        ...defaultTx,
        namespaceRegistration: {
          name: namespaceRegistrationTx.namespaceName,
          registrationType: Constants.NamespaceRegistrationType[namespaceRegistrationTx.registrationType],
          namespaceId: namespaceRegistrationTx.namespaceId.toHex(),
          parentId: namespaceRegistrationTx.parentId ? namespaceRegistrationTx.parentId.toHex() : 'none',
          duration: namespaceRegistrationTx.duration ? namespaceRegistrationTx.duration.compact() : 0,
        },
      }
    } else if (tx.type === TransactionType.NAMESPACE_METADATA) {
      const namespaceMetadataTx = tx as NamespaceMetadataTransaction
      return {
        ...defaultTx,
        namespaceMetadata: {
          namespaceId: namespaceMetadataTx.targetNamespaceId.toHex(),
          metadataKey: namespaceMetadataTx.scopedMetadataKey.toHex(),
          metadataValue: Convert.uint8ToUtf8(namespaceMetadataTx.value),
        },
      }
    } else if (tx.type === TransactionType.HASH_LOCK) {
      const hashLockTx = tx as HashLockTransaction
      return {
        ...defaultTx,
        hashLock: {
          hash: hashLockTx.hash,
          duration: hashLockTx.duration.compact(),
        },
      }
    } else if (tx.type === TransactionType.SECRET_LOCK) {
      const secretLockTx = tx as SecretLockTransaction
      return {
        ...defaultTx,
        secretLock: {
          secret: secretLockTx.secret,
          duration: secretLockTx.duration.compact(),
          hashAlgorithm: Constants.HashAlgorithmType[secretLockTx.hashAlgorithm],
          recipientAddress: secretLockTx.recipientAddress.plain(),
        },
      }
    } else if (tx.type === TransactionType.SECRET_PROOF) {
      const secretProofTx = tx as SecretProofTransaction
      return {
        ...defaultTx,
        secretProof: {
          secret: secretProofTx.secret,
          hashAlgorithm: Constants.HashAlgorithmType[secretProofTx.hashAlgorithm],
          proof: secretProofTx.proof,
          recipientAddress: secretProofTx.recipientAddress.plain(),
        },
      }
    } else if (tx.type === TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
      const multisigAccountModificationTx = tx as MultisigAccountModificationTransaction
      return {
        ...defaultTx,
        multisigAccountModification: {
          minApprovalDelta: multisigAccountModificationTx.minApprovalDelta,
          minRemovalDelta: multisigAccountModificationTx.minRemovalDelta,
          addressAdditions: multisigAccountModificationTx.addressAdditions
            ? multisigAccountModificationTx.addressAdditions.map((address) => address.plain())
            : [],
          addressDeletions: multisigAccountModificationTx.addressDeletions
            ? multisigAccountModificationTx.addressDeletions.map((address) => address.plain())
            : [],
        },
      }
    } else if (tx.type === TransactionType.ADDRESS_ALIAS) {
      const addressAliasTx = tx as AddressAliasTransaction
      return {
        ...defaultTx,
        addressAlias: {
          address: addressAliasTx.address.plain(),
          namespaceId: addressAliasTx.namespaceId ? addressAliasTx.namespaceId.toHex() : 'none',
          aliasAction: Constants.AliasAction[addressAliasTx.aliasAction],
        },
      }
    } else if (tx.type === TransactionType.MOSAIC_GLOBAL_RESTRICTION) {
      const mosaicGlobalRestrictionTx = tx as MosaicGlobalRestrictionTransaction
      return {
        ...defaultTx,
        mosaicGlobalRestriction: {
          mosaicId: mosaicGlobalRestrictionTx.mosaicId.toHex(),
          referenceMosaicId: mosaicGlobalRestrictionTx.referenceMosaicId.toHex(),
          restrictionKey: mosaicGlobalRestrictionTx.restrictionKey.toHex(),
          previousRestrictionValue: mosaicGlobalRestrictionTx.previousRestrictionValue.compact(),
          newRestrictionValue: mosaicGlobalRestrictionTx.newRestrictionValue.compact(),
          previousRestrictionType: Constants.MosaicRestrictionType[mosaicGlobalRestrictionTx.previousRestrictionType],
          newRestrictionType: Constants.MosaicRestrictionType[mosaicGlobalRestrictionTx.newRestrictionType],
        },
      }
    // } else if (tx.type === TransactionType.ACCOUNT_KEY_LINK) {
    // } else if (tx.type === TransactionType.NODE_KEY_LINK) {
    // } else if (tx.type === TransactionType.VOTING_KEY_LINK) {
    // } else if (tx.type === TransactionType.VRF_KEY_LINK) {
    } else {
      return {
        ...defaultTx,
        txInfo: tx,
      }
    }
  }
}
