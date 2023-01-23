import RepositoryFactory from '../../service/RepositoryFactory'
import { IMosaicInfoOption, ConfigFile } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import MosaicServices from '../../service/MosaicServices'

const logger = LoggerFactory.getLogger()

export default async (option: IMosaicInfoOption) => {
  const { url, readfile, mosaicrawId } = option

  let configFile

  if (readfile && (await checkFile(readfile))) {
    configFile = await readConfig(readfile)
  }

  if (!url && !configFile) {
    logger.error(`Must Set mijin URL(-u http://xxxxxx.com:3000) or Set Read Config(-r config.json)`)
    return
  }

  const mijinUrl = url ? url : configFile ? configFile.url : ''

  const repo = new RepositoryFactory(mijinUrl)
  await repo.init()

  const networkType = repo.getNetwork()
  const epoch = repo.getEpoch()

  logger.info(`mijin URL: ${mijinUrl}`)
  logger.info(`Network: ${networkType.toString()}`)

  if (!mosaicrawId) {
    logger.error(`Must set Mosaic Id`)
    return
  }
  const mosaicInfo = await MosaicServices.getMosaic(mosaicrawId, repo.createMosaicRepository())
  logger.info(`Mosaic Info: ${JSON.stringify(MosaicServices.mosaicInfo(mosaicInfo), null, '  ')}`)
}
