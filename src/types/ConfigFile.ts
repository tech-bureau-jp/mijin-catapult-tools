export interface ConfigFile {
  url: string
  workAccount: ConfigAccount
  balanceAccount: ConfigAccount
  mainAccount: ConfigAccount
  keylink: {
    vrf: ConfigAccount
    voting: ConfigAccount
  }
  multisig?: {
    minApproval?: number
    minRemoval?: number
    addCosigner?: ConfigAccount[]
    delCosigner?: ConfigAccount[]
  }
  test1Account: ConfigAccount
  test2Account: ConfigAccount
}

interface ConfigAccount {
  publicKey: string
  privateKey: string
  address: string
}
