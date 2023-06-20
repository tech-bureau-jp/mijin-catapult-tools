import { IVotingInfoOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import RepositoryFactory from '../../service/RepositoryFactory'
import { VotingUtils } from '../../service/VotingServices'
import { readConfig, checkFile } from '../../utils'

const logger = LoggerFactory.getLogger()

export default async (option: IVotingInfoOption) => {
  const { url, readfile, savedir, bod } = option

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
    await repo.init(bod)
  } catch (error) {
    logger.error(`Please specify a valid URL: ${mijinUrl}`)
    return
  }

  const votingUtil = new VotingUtils()

  const dir = savedir === 'current' ? process.cwd() : savedir

  logger.info(`Start Voting Key Check Dir... ${dir}`)
  const votingFiles = votingUtil.loadVotingFiles(dir)
  votingFiles.map((v, i) => {
    logger.info(`votingfile: index${i}:  ${JSON.stringify(v)}`)
  })
}
