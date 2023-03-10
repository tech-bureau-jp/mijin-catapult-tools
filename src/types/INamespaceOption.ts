export interface INamespaceCreateOption {
  owner: string
  url?: string
  name: string
  duration?: number
  parentName?: string
  mosaicId?: string
  address?: string
  readfile?: string
  privatekey?: string
}

export interface INamespaceInfoOption {
  url?: string
  readfile?: string
  namespaceId?: string
}
