import MosaicServices from '../../service/MosaicServices'
import AccountServices from '../../service/AccountServices'
import { Mosaic, NetworkType } from '@tech-bureau/symbol-sdk'

const config = {
  url: 'http://localhost:3000',
  workAccount: {
    publicKey: '65AB2F5671F285325E0A196651566D3770A1A809C4C169DDFED157E86F63ABA1',
    privateKey: '1E33ACC3CD9F7BB01D1EDD0F560F2D9635D7E6F98D7BFB3EA7EF7EDA5303FB80',
    address: 'MD2NEFQ75FKV5HDOTLTZNEE5SYRRMIAYFYJKA3Q',
  },
  balanceAccount: {
    publicKey: '',
    privateKey: '',
    address: '',
  },
  mainAccount: {
    publicKey: 'CF4250FA98A00C2B201D3BCB4CF5B7965C41DFBD6D331CB56F16BCC03DB79B4C',
    privateKey: 'BFC70F2FC37D1CD31F60CE3DC11DD9CF3E0DAEA2B5D960F3456FB63AA0AC83C2',
    address: 'MDAHM3BQQTLIA4WHWN572U35ZJG2ULVJWYCSG5I',
  },
  keylink: {
    vrf: {
      publicKey: '4DC4AFDC04F0271CFFB2B65B0A5E505184EC5AD81892B7541397D2F85F1533D3',
      privateKey: '495656E00893DD1FB8AEF833FF1F60ED2D1D7EF050213EE4DADCC7CC01493ADF',
      address: 'MBR6DL2MMFAG2ASPU5N4HSZPK6I6IEDKB747BRQ',
    },
    voting: {
      publicKey: '937E1684027FB86BAFF47146C98F166767BD3BE3C00E1BF47657C72EBE2C3500',
      privateKey: '1393923A4CE0547D713C9D6C5C327F23ADFB6CCEE344E173528C9119F9654F65',
      address: 'MAL6PBEOZ4KQD4RKTUHCFA2CO2FYYGGMY77KFEA',
    },
  },
  test1Account: {
    publicKey: '49CEF8886711941127EFA8492829748D523F5C6CD4B17EA45759AFEC37BA4C22',
    privateKey: 'D60BA72D4AA73D0845F1742F95C6CEC2F5576DE0C9AA3C4AC764C362AC93ED2C',
    address: 'MDBZDEIYKPLEYGJ7S55TLTXH3R5JZDKP2TPLOUQ',
  },
  test2Account: {
    publicKey: 'A0E0D1D095E22E49A8E679AA470A1A0B10714C27E6471F6C99D982A7FF8A025B',
    privateKey: 'F141362C6F636FCE21BE72C2E42779202F54A91AF14A9BF6140FAA3FCC641944',
    address: 'MAURGUI3OOJ6NF7OUYYEWS6QTAIFLJFK4EQGWZA',
  },
}

const mosaicRawId = '13CD4D0575AD0250'

describe('start mosaic test', () => {
  it('Create Mosaic Id function', async () => {
    const nonce = MosaicServices.createMosaicNonce()
    const address = AccountServices.createAddress(config.workAccount.address)
    const mosaicId = MosaicServices.createMosaicId(nonce, address)
    const mosaicFlag = MosaicServices.createMosaicFlags(
      JSON.parse('false'),
      JSON.parse('true'),
      JSON.parse('true'),
      JSON.parse('false')
    )

    expect(mosaicId).toBeDefined()
    expect(mosaicFlag.getValue()).toEqual(6)
  })

  it('Create Mosaic function', async () => {
    const mosaic = MosaicServices.create(mosaicRawId, 1)
    expect(mosaic).toBeDefined()
  })
})
