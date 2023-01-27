export interface IVotingCreateOption {
  url?: string
  readfile?: string
  startepoch?: string
  endepoch?: string
  savedir: string
  privatekey?: string
}

export interface IVotingInfoOption {
  url?: string
  readfile?: string
  savedir: string
}

export interface IVotingUpdateOption {
  url?: string
  readfile?: string
  startepoch: string
  endepoch: string
  savedir: string
  privatekey?: string
}
