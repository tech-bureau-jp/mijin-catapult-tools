import AccountServices from '../../service/AccountServices'
import { NetworkType, RepositoryFactoryHttp } from '@tech-bureau-jp/symbol-sdk'

const config = {
  url: 'http://localhost:3000',
  workAccount: {
    publicKey: '3F27354F4AB597815CC0AE5DCF0A76B84972B9DC4C2C8B3444A5B7B33CDCCC8B',
    privateKey: '43798BEA15F8AEBEDD5E0A118E22CF92961C9828DA5CF6D4934B8E90ABEBF810',
    address: 'MCSY5DDP3BPAZBBAGTVQIOGOSPPVW44MUNRYS6Y',
  },
  balanceAccount: {
    publicKey: '',
    privateKey: '',
    address: '',
  },
  mainAccount: {
    publicKey: '6FD0C210197575FCD0D107A1D7659A1C1C50B772D8A20DE5087BA9CF3B219AED',
    privateKey: 'EA23C6C6B51A792787E1C9B0F3853BE6A67E1A5A582B2C0C0574DC081519202F',
    address: 'MD5TU6DJ6ASYD6FZ6JPUXSYQBWOMX62ZU6BQVIY',
  },
  keylink: {
    vrf: {
      publicKey: '594CE57AF061552E2579DB4E3D72E6734A51233A1D673E251DB9E5D746D625B5',
      privateKey: '6223A626A49F9B0AD8C604FC0FDC958A7A6CAF7E423ED6F3CC3FBC05F1876337',
      address: 'MD6E6WAON6MUBLFHQSWSSGD74T6N3MWT6FFLDVQ',
    },
    voting: {
      publicKey: '2DB728332ADCA6FE4424C21C7E0FC4831955744B3C86EB957318C9D467C8CD9D',
      privateKey: '67F0FE4040B10F03230C8134327301B270693CF4D6A99DEFE835A0DCC8A0CCFD',
      address: 'MBG6SPNMS6INNPI5MKIF6XINEKAWNAJ5EVK6V6Y',
    },
  },
}

describe('start create account test', () => {
  it('Create Account from PrivateKey function', async () => {
    const account = AccountServices.createAccount(config.mainAccount.privateKey, NetworkType.MIJIN_TEST)
    expect(account).toBeDefined()
  })

  it('Create Account from PublicKey function', async () => {
    const account = AccountServices.createPublicAccount(config.mainAccount.publicKey, NetworkType.MIJIN_TEST)
    expect(account).toBeDefined()
  })

  it('Create Accounts from PublicKey function', async () => {
    const account = AccountServices.createPublicAccountArray(
      [config.mainAccount.publicKey, config.keylink.voting.publicKey, config.keylink.vrf.publicKey],
      NetworkType.MIJIN_TEST
    )
    expect(account).toBeDefined()
  })

  it('Create Address from Raw Address function', async () => {
    const address = AccountServices.createAddress(config.mainAccount.address)
    expect(address).toBeDefined()

    // const accountRepository = new RepositoryFactoryHttp(config.url).createAccountRepository()

    // const addressInfo = await AccountServices.addressInfo(address, accountRepository)
    // expect(addressInfo).toBeDefined()
  })
})
