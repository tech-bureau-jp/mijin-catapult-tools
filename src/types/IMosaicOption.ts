export interface IMosaicCreateOption {
  owner: string
  url?: string
  supply: string
  divisibility: string
  supplymutable: boolean
  transferable: boolean
  restrictable: boolean
  revokable: boolean
  readfile?: string
  privatekey?: string
}

export interface IMosaicInfoOption {
  url?: string
  readfile?: string
  mosaicrawId?: string
}
