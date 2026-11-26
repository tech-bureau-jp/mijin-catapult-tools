import TransactionServices from '../../service/TransactionServices'
import { LinkAction, NetworkType } from '@tech-bureau/symbol-sdk'

describe('TransactionServices', () => {
  const votingPublicKey = '937E1684027FB86BAFF47146C98F166767BD3BE3C00E1BF47657C72EBE2C3500'

  it('createVotingKey uses the given start and end epochs', () => {
    const tx = TransactionServices.createVotingKey(1667250467, votingPublicKey, 26281, 52560, NetworkType.MIJIN_TEST)

    expect(tx.startEpoch).toBe(26281)
    expect(tx.endEpoch).toBe(52560)
    expect(tx.linkAction).toBe(LinkAction.Link)
    expect(tx.linkedPublicKey).toBe(votingPublicKey)
    expect(tx.version).toBe(1)
  })
})
