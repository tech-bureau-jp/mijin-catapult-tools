export interface IMosaicCreateOption {
  owner: string
  url?: string
  supply: string
  divisibility: string
  supplymutable: string
  transferable: string
  restrictable: string
  revokable: string
  readfile?: string
  privatekey?: string
  bod: boolean
}

export interface IMosaicInfoOption {
  url?: string
  readfile?: string
  mosaicrawId?: string
  bod: boolean
}
