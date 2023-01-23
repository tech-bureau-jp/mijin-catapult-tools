import AccountServices from '../../service/AccountServices'
import RepositoryFactory from '../../service/RepositoryFactory'
import { IAccountInfoOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'

const logger = LoggerFactory.getLogger()

export default async (option: IAccountInfoOption) => {
  const { type, url, readfile, address } = option

  let configFile

  if (readfile && (await checkFile(readfile))) {
    configFile = await readConfig(readfile)
  }

  const mijinUrl = url ? url : configFile ? configFile.url : undefined

  if (!mijinUrl) {
    logger.error(`Must Set mijin URL(-u http://xxxxxx.com:3000) or Set Read Config(-r config.json)`)
    return
  }

  let repo

  try {
    repo = new RepositoryFactory(mijinUrl)
    await repo.init()
  } catch (error) {
    logger.error(`Please specify a valid URL: ${mijinUrl}`)
    return
  }

  const networkType = repo.getNetwork()
  const epoch = repo.getEpoch()

  logger.info(`mijin URL: ${mijinUrl}`)
  logger.info(`Network: ${networkType.toString()}`)
  logger.info(`Mosaic Currency Id: ${repo.getCurrency().currency.mosaicId?.id.toHex()}`)
  logger.info(`Mosaic Harvest Id: ${repo.getCurrency().harvest.mosaicId?.id.toHex()}`)

  logger.info('Start Account Info')

  try {
    switch (type) {
      case 'balance':
        if (typeof configFile === 'undefined' || (configFile && !configFile.balanceAccount.privateKey)) {
          logger.error(`Not Set Balance Account`)
          return
        }
        const balanceAccount = AccountServices.createAccount(configFile.balanceAccount.privateKey, networkType)
        const balanceAccountInfo = await AccountServices.addressInfo(
          balanceAccount.address,
          repo.createAccountRepository()
        )
        logger.info(
          'balance Account: ' +
            JSON.stringify(AccountServices.accountInfo(balanceAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'work':
        if (typeof configFile === 'undefined' || (configFile && !configFile.workAccount.privateKey)) {
          logger.error(`Not Set Wrok Account`)
          return
        }
        const workAccount = AccountServices.createAccount(configFile.workAccount.privateKey, networkType)
        const workAccountInfo = await AccountServices.addressInfo(workAccount.address, repo.createAccountRepository())
        logger.info(
          'work Account: ' +
            JSON.stringify(AccountServices.accountInfo(workAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'main':
        if (typeof configFile === 'undefined' || (configFile && !configFile.mainAccount.privateKey)) {
          logger.error(`Not Set Main Account`)
          return
        }
        const mainAccount = AccountServices.createAccount(configFile.mainAccount.privateKey, networkType)
        const mainAccountInfo = await AccountServices.addressInfo(mainAccount.address, repo.createAccountRepository())
        logger.info(
          'node Account: ' +
            JSON.stringify(AccountServices.accountInfo(mainAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'vrf':
        if (typeof configFile === 'undefined' || (configFile && !configFile.keylink.vrf.privateKey)) {
          logger.error(`Not Set Vrf Account`)
          return
        }
        const vrfAccount = AccountServices.createAccount(configFile.keylink.vrf.privateKey, networkType)
        const vrfAccountInfo = await AccountServices.addressInfo(vrfAccount.address, repo.createAccountRepository())
        logger.info(
          'vrf Account: ' + JSON.stringify(AccountServices.accountInfo(vrfAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'voting':
        if (typeof configFile === 'undefined' || (configFile && !configFile.keylink.voting.privateKey)) {
          logger.error(`Not Set Voting Account`)
          return
        }
        const votingAccount = AccountServices.createAccount(configFile.keylink.voting.privateKey, networkType)
        const votingAccountInfo = await AccountServices.addressInfo(
          votingAccount.address,
          repo.createAccountRepository()
        )
        logger.info(
          'voting Account: ' +
            JSON.stringify(AccountServices.accountInfo(votingAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'test1':
        if (typeof configFile === 'undefined' || (configFile && !configFile.test1Account.privateKey)) {
          logger.error(`Not Set Main Account`)
          return
        }
        const test1Account = AccountServices.createAccount(configFile.test1Account.privateKey, networkType)
        const test1AccountInfo = await AccountServices.addressInfo(test1Account.address, repo.createAccountRepository())
        logger.info(
          'test1 Account: ' +
            JSON.stringify(AccountServices.accountInfo(test1AccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      case 'test2':
        if (typeof configFile === 'undefined' || (configFile && !configFile.test2Account.privateKey)) {
          logger.error(`Not Set Main Account`)
          return
        }
        const test2Account = AccountServices.createAccount(configFile.test2Account.privateKey, networkType)
        const test2AccountInfo = await AccountServices.addressInfo(test2Account.address, repo.createAccountRepository())
        logger.info(
          'test1 Account: ' +
            JSON.stringify(AccountServices.accountInfo(test2AccountInfo, repo.getCurrency()), null, '  ')
        )
        break
      default:
        if (!address) {
          logger.error('Must set -a Address')
          return
        }
        const otherAccountInfo = await AccountServices.addressInfo(
          AccountServices.createAddress(address),
          repo.createAccountRepository()
        )
        logger.info(
          'get Account: ' +
            JSON.stringify(AccountServices.accountInfo(otherAccountInfo, repo.getCurrency()), null, '  ')
        )
        break
    }
  } catch (error) {
    logger.error(error)
  }
}
