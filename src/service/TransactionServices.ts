import {
  AggregateTransaction,
  Deadline,
  InnerTransaction,
  NetworkType,
  Account,
  CosignatureTransaction,
  TransactionAnnounceResponse,
  AccountKeyLinkTransaction,
  LinkAction,
  NodeKeyLinkTransaction,
  VotingKeyLinkTransaction,
  VrfKeyLinkTransaction,
  HashLockTransaction,
  Mosaic,
  SignedTransaction,
  UInt64,
  MultisigAccountModificationTransaction,
  Address,
  Message,
  TransferTransaction,
  IListener,
  ReceiptRepository,
  TransactionRepository,
  TransactionService,
  MosaicDefinitionTransaction,
  MosaicNonce,
  MosaicId,
  MosaicFlags,
  MosaicSupplyChangeTransaction,
  MosaicSupplyChangeAction,
  TransactionGroup,
  TransactionStatus,
  Transaction,
  BlockRepository,
  BlockInfo,
  TransactionStatusRepository,
} from '@tech-bureau/symbol-sdk'
import { ChronoUnit } from '@js-joda/core'
import { firstValueFrom } from 'rxjs'
import CreateAccount from './AccountServices'

export default class TransactionServices {
  constructor() {}

  static async getTransactionStatus(
    transactionRepository: TransactionStatusRepository,
    transactionId: string
  ): Promise<TransactionStatus> {
    return await firstValueFrom(transactionRepository.getTransactionStatus(transactionId))
  }

  static async getTransaction(
    transactionRepository: TransactionRepository,
    transactionId: string,
    transactionStatus: string
  ): Promise<Transaction> {
    return await firstValueFrom(
      transactionRepository.getTransaction(
        transactionId,
        transactionStatus === 'confirmed'
          ? TransactionGroup.Confirmed
          : transactionStatus === 'partial'
          ? TransactionGroup.Partial
          : TransactionGroup.Unconfirmed
      )
    )
  }

  static async getBlock(blockRepository: BlockRepository, height: UInt64): Promise<BlockInfo> {
    return await firstValueFrom(blockRepository.getBlockByHeight(height))
  }

  static async announceCosign(
    transactionRepository: TransactionRepository,
    account: Account,
    transaction: AggregateTransaction
  ): Promise<TransactionAnnounceResponse> {
    const signdTransaction = account.signCosignatureTransaction(CosignatureTransaction.create(transaction))
    return await firstValueFrom(transactionRepository.announceAggregateBondedCosignature(signdTransaction))
  }

  static async announceHashLockAggregateBonded(
    signedHashLockTransaction: SignedTransaction,
    signedTransaction: SignedTransaction,
    listener: IListener,
    transactionRepository: TransactionRepository,
    receiptRepository: ReceiptRepository
  ) {
    const service = new TransactionService(transactionRepository, receiptRepository)

    await listener.open()
    const aggtx = await firstValueFrom(
      service.announceHashLockAggregateBonded(signedHashLockTransaction, signedTransaction, listener)
    ).catch((err) => {
      listener.close()
      throw new Error(err)
    })
    listener.close()
    return aggtx
  }

  static async announce(
    signedTransaction: SignedTransaction,
    listener: IListener,
    transactionRepository: TransactionRepository,
    receiptRepository: ReceiptRepository
  ) {
    const service = new TransactionService(transactionRepository, receiptRepository)

    await listener.open()
    const tx = await firstValueFrom(service.announce(signedTransaction, listener)).catch((err) => {
      listener.close()
      throw new Error(err)
    })
    listener.close()
    return tx
  }

  static createHashLock(
    epoch: number,
    mosaic: Mosaic,
    signedTransaction: SignedTransaction,
    networkType: NetworkType
  ): HashLockTransaction {
    return HashLockTransaction.create(
      Deadline.create(epoch, 6, ChronoUnit.HOURS),
      mosaic,
      UInt64.fromUint(5760),
      signedTransaction,
      networkType
    )
  }

  static createBonded(epoch: number, transactions: InnerTransaction[], networkType: NetworkType): AggregateTransaction {
    return AggregateTransaction.createBonded(
      Deadline.create(epoch, 24, ChronoUnit.HOURS),
      transactions,
      networkType,
      []
    )
  }

  static createComplete(
    epoch: number,
    transactions: InnerTransaction[],
    networkType: NetworkType
  ): AggregateTransaction {
    return AggregateTransaction.createComplete(
      Deadline.create(epoch, 24, ChronoUnit.HOURS),
      transactions,
      networkType,
      []
    )
  }

  static createVrfKey(epoch: number, linkPublickey: string, networkType: NetworkType): VrfKeyLinkTransaction {
    return VrfKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Link, networkType)
  }

  static createVotingKey(epoch: number, linkPublickey: string, networkType: NetworkType): VotingKeyLinkTransaction {
    return VotingKeyLinkTransaction.create(
      Deadline.create(epoch),
      linkPublickey,
      1,
      360,
      LinkAction.Link,
      networkType,
      1
    )
  }

  static createAccountKey(epoch: number, linkPublickey: string, networkType: NetworkType): AccountKeyLinkTransaction {
    return AccountKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Link, networkType)
  }

  static createNodeKey(epoch: number, linkPublickey: string, networkType: NetworkType): NodeKeyLinkTransaction {
    return NodeKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Link, networkType)
  }

  static createMultisig(
    epoch: number,
    minApproval: number,
    minRemoval: number,
    addAddresses: string[] | [],
    delAddresses: string[] | [],
    networkType: NetworkType
  ) {
    const addressAdditions =
      addAddresses.length > 0 ? CreateAccount.createPublicAccountArray(addAddresses, networkType) : []
    const addressDeletions =
      delAddresses.length > 0 ? CreateAccount.createPublicAccountArray(delAddresses, networkType) : []
    return MultisigAccountModificationTransaction.create(
      Deadline.create(epoch, 6, ChronoUnit.HOURS),
      minApproval,
      minRemoval,
      addressAdditions,
      addressDeletions,
      networkType
    )
  }

  static createTransfer(
    epoch: number,
    recipientAddress: Address,
    mosaic: Mosaic[] | [],
    message: Message,
    networkType: NetworkType
  ): TransferTransaction {
    return TransferTransaction.create(
      Deadline.create(epoch, 6, ChronoUnit.HOURS),
      recipientAddress,
      mosaic,
      message,
      networkType
    )
  }

  static createMosaicDefinition(
    epoch: number,
    nonce: MosaicNonce,
    mosaicId: MosaicId,
    mosaicFlags: MosaicFlags,
    divisibility: number,
    networkType: NetworkType,
    duration?: number | undefined
  ): MosaicDefinitionTransaction {
    return MosaicDefinitionTransaction.create(
      Deadline.create(epoch),
      nonce,
      mosaicId,
      mosaicFlags,
      divisibility,
      duration ? UInt64.fromUint(duration) : UInt64.fromUint(0),
      networkType
    )
  }

  static createMosaicSupplyChange(
    epoch: number,
    mosaicId: MosaicId,
    mosaicSupply: number,
    networkType: NetworkType
  ): MosaicSupplyChangeTransaction {
    return MosaicSupplyChangeTransaction.create(
      Deadline.create(epoch),
      mosaicId,
      MosaicSupplyChangeAction.Increase,
      UInt64.fromUint(mosaicSupply),
      networkType
    )
  }

  static deleteVrf(epoch: number, linkPublickey: string, networkType: NetworkType): VrfKeyLinkTransaction {
    return VrfKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Unlink, networkType)
  }

  static deleteVoting(epoch: number, linkPublickey: string, networkType: NetworkType): VotingKeyLinkTransaction {
    return VotingKeyLinkTransaction.create(
      Deadline.create(epoch),
      linkPublickey,
      1,
      26280,
      LinkAction.Unlink,
      networkType,
      1
    )
  }

  static deleteAccount(epoch: number, linkPublickey: string, networkType: NetworkType): AccountKeyLinkTransaction {
    return AccountKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Unlink, networkType)
  }

  static deleteNode(epoch: number, linkPublickey: string, networkType: NetworkType): NodeKeyLinkTransaction {
    return NodeKeyLinkTransaction.create(Deadline.create(epoch), linkPublickey, LinkAction.Unlink, networkType)
  }
}
