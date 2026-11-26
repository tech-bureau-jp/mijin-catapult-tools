import { checkVotingKeyLink, parseChainNumber, selectLatestVotingFile } from '../../service/VotingLinkServices'

const K = '937E1684027FB86BAFF47146C98F166767BD3BE3C00E1BF47657C72EBE2C3500'
const limits = { maxLinks: 3, minLifetime: 72, maxLifetime: 26280 }
const key = (startEpoch: number, endEpoch: number) => ({ publicKey: K, startEpoch, endEpoch })

describe('selectLatestVotingFile', () => {
  it('returns undefined when there are no files', () => {
    expect(selectLatestVotingFile([])).toBeUndefined()
  })

  it('returns the file with the largest start epoch', () => {
    const files = [
      { ...key(26281, 52560), filename: 'private_key_tree2.dat' },
      { ...key(1, 26280), filename: 'private_key_tree1.dat' },
    ]
    expect(selectLatestVotingFile(files)?.filename).toBe('private_key_tree2.dat')
  })
})

describe('parseChainNumber', () => {
  it('parses plain numbers', () => {
    expect(parseChainNumber('3', 9)).toBe(3)
  })

  it('parses numbers with digit separators', () => {
    expect(parseChainNumber("26'280", 1)).toBe(26280)
  })

  it('falls back when the value is missing or invalid', () => {
    expect(parseChainNumber(undefined, 3)).toBe(3)
    expect(parseChainNumber('abc', 3)).toBe(3)
  })
})

describe('checkVotingKeyLink', () => {
  it('allows a link when nothing is linked', () => {
    expect(checkVotingKeyLink(key(1, 26280), undefined, limits)).toBeUndefined()
  })

  it('allows a later range with the same public key', () => {
    expect(checkVotingKeyLink(key(26281, 52560), [key(1, 26280)], limits)).toBeUndefined()
  })

  it('rejects a key that is already linked', () => {
    expect(checkVotingKeyLink(key(1, 26280), [key(1, 26280)], limits)).toContain('already linked')
  })

  it('rejects a range that overlaps a linked key', () => {
    expect(checkVotingKeyLink(key(26000, 52279), [key(1, 26280)], limits)).toContain('overlaps')
  })

  it('rejects a link when the maximum number of keys is linked', () => {
    const linked = [key(1, 26280), key(26281, 52560), key(52561, 78840)]
    expect(checkVotingKeyLink(key(78841, 105120), linked, limits)).toContain('maximum')
  })

  it('rejects a lifetime shorter than the minimum', () => {
    expect(checkVotingKeyLink(key(1, 71), undefined, limits)).toContain('lifetime')
  })

  it('rejects a lifetime longer than the maximum', () => {
    expect(checkVotingKeyLink(key(1, 26281), undefined, limits)).toContain('lifetime')
  })
})
