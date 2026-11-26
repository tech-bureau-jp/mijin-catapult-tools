import { VotingKeyAccount, VotingKeyFile } from './VotingServices'

export interface VotingLinkLimits {
  maxLinks: number
  minLifetime: number
  maxLifetime: number
}

export const selectLatestVotingFile = (files: VotingKeyFile[]): VotingKeyFile | undefined =>
  files.reduce<VotingKeyFile | undefined>(
    (latest, file) => (!latest || file.startEpoch > latest.startEpoch ? file : latest),
    undefined
  )

// catapult network properties may use ' as a digit separator (e.g. 26'280)
export const parseChainNumber = (value: string | undefined, fallback: number): number => {
  if (value === undefined) {
    return fallback
  }
  const parsed = Number(value.replace(/'/g, ''))
  return Number.isFinite(parsed) && value.trim() !== '' ? parsed : fallback
}

// Returns undefined if the key can be linked, otherwise the reason it cannot.
export const checkVotingKeyLink = (
  key: VotingKeyAccount,
  linked: VotingKeyAccount[] | undefined,
  limits: VotingLinkLimits
): string | undefined => {
  const lifetime = key.endEpoch - key.startEpoch + 1
  if (lifetime < limits.minLifetime || lifetime > limits.maxLifetime) {
    return `Voting key lifetime ${lifetime} is out of range (${limits.minLifetime} - ${limits.maxLifetime} epochs)`
  }

  const linkedKeys = linked ?? []
  const sameLink = linkedKeys.find(
    (l) =>
      l.publicKey.toUpperCase() === key.publicKey.toUpperCase() &&
      l.startEpoch === key.startEpoch &&
      l.endEpoch === key.endEpoch
  )
  if (sameLink) {
    return `Voting key is already linked (epoch ${key.startEpoch} - ${key.endEpoch})`
  }

  if (linkedKeys.length >= limits.maxLinks) {
    return `The maximum number of voting keys (${limits.maxLinks}) is already linked`
  }

  const linkedEndEpoch = Math.max(...linkedKeys.map((l) => l.endEpoch), 0)
  if (key.startEpoch <= linkedEndEpoch) {
    return `Start epoch ${key.startEpoch} overlaps a linked voting key (linked up to epoch ${linkedEndEpoch})`
  }

  return undefined
}
