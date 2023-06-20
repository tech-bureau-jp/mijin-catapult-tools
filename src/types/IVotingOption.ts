export interface IVotingCreateOption {
  url?: string
  readfile?: string
  startepoch?: string
  endepoch?: string
  savedir: string
  privatekey?: string
  bod: boolean
}

export interface IVotingInfoOption {
  url?: string
  readfile?: string
  savedir: string
  bod: boolean
}

export interface IVotingUpdateOption {
  url?: string
  readfile?: string
  startepoch: string
  endepoch: string
  savedir: string
  privatekey?: string
  bod: boolean
}
