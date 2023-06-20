import { Account, EncryptedMessage, Message, PlainMessage, PublicAccount, RawMessage } from '@tech-bureau/symbol-sdk'

export default class MessageServices {
  constructor() {}

  static createPlain(message: string): Message {
    return PlainMessage.create(message)
  }

  static createEncrypt(message: string, publicAccount: PublicAccount, privateKey: string): Message {
    return EncryptedMessage.create(message, publicAccount, privateKey)
  }

  static createDecrypt(message: Message, publicAccount: PublicAccount, account: Account): Message {
    return account.decryptMessage(message as EncryptedMessage, publicAccount)
  }

  static createRaw(buffer: Uint8Array): Message {
    return RawMessage.create(buffer)
  }
}
