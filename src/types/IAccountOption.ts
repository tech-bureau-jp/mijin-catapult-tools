export interface IAccountGenerateOption {
  url?: string
  nodename?: string
  readfile?: string
  writefile?: string
  certsdir?: string
  privatekey?: string
  service: boolean
  bod: boolean
}

export interface IAccountInfoOption {
  type?: string
  url?: string
  readfile?: string
  address?: string
  bod: boolean
}
