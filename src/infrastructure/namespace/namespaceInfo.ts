import RepositoryFactory from '../../service/RepositoryFactory'
import { INamespaceInfoOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import { readConfig, checkFile } from '../../utils'
import NamespaceServices from '../../service/NamespaceServices'

const logger = LoggerFactory.getLogger()

export default async (option: INamespaceInfoOption) => {
  const { url, readfile, namespaceId, bod } = option

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
  await repo.init(bod)

  const networkType = repo.getNetwork()

  logger.info(`mijin URL: ${mijinUrl}`)
  logger.info(`Network: ${networkType.toString()}`)

  if (!namespaceId) {
    logger.error(`Must set Namespace Id`)
    return
  }
  logger.info(`Namespace Id: ${namespaceId}`)
  const namespaceInfo = await NamespaceServices.getNamespace(namespaceId, repo.createNamespaceRepository())
  if (!namespaceInfo) {
    logger.info(`Namespace Not Found`)
    return
  }
  logger.info(`Namespace Info: ${JSON.stringify(NamespaceServices.namespaceInfo(namespaceInfo), null, '  ')}`)
}
