import { IVotingUpdateOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import RepositoryFactory from '../../service/RepositoryFactory'
import { VotingUtils } from '../../service/VotingServices'
import { readConfig, checkFile, writeFile } from '../../utils'
import userEnv from 'userEnv'

const logger = LoggerFactory.getLogger()

export default async (option: IVotingUpdateOption) => {
  const { url, readfile, savedir } = option

  let configFile

  if (readfile && (await checkFile(readfile))) {
    configFile = await readConfig(readfile)
  }

  if (!configFile) {
    logger.error('Set Read Config(-r config.json)')
    return
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

  // (VotingSetGroup(180) * maxVotingKeyLifetime(26280)) / ( 60 / blockGenerationTargetTime * 60 * 24)
  // 180 * 26280 / (60 /15 * 60 * 24) = 821日
  const networkProperties = repo.getNetworkProperties()

  const votingSetGroup = userEnv.mijin.voting.votingSetGroup
  const maxVotingKeyLifetime = Number(networkProperties.chain.maxVotingKeyLifetime)
  const blockGenerationTargetTime = Number(networkProperties.chain.blockGenerationTargetTime?.replace('s', ''))

  const votingUtil = new VotingUtils()

  const dir = savedir === 'current' ? process.cwd() : savedir

  let votingFiles
  let votingMaxEpoch
  let votingStartEpoch
  let votingEndEpoch

  logger.info('Start Voting Key Update...')

  if (!(await checkFile(`${dir}/private_key_tree1.dat`))) {
    logger.error(`Voting Key file Check: FAILED ${dir}/private_key_tree1.dat`)
    return
  }

  votingFiles = votingUtil.loadVotingFiles(dir)
  const latestVotingFile = votingFiles[votingFiles.length - 1]

  votingMaxEpoch = Math.max(repo.getEinalizationEpoch(), latestVotingFile.endEpoch)
  votingStartEpoch = votingMaxEpoch + 1
  votingEndEpoch = votingMaxEpoch + maxVotingKeyLifetime

  logger.info(`votingSetGroup: ${votingSetGroup}`)
  logger.info(`votingMaxEpoch: ${votingMaxEpoch}`)
  logger.info(`votingStartEpoch: ${votingStartEpoch}`)
  logger.info(`votingEndEpoch: ${votingEndEpoch}`)
  logger.info(`blockGenerationTargetTime: ${blockGenerationTargetTime}`)

  const newVotingfile = await votingUtil.createVotingFile(
    configFile.keylink.voting.privateKey,
    votingStartEpoch,
    votingEndEpoch
  )

  const votingFileindex = votingFiles.length + 1

  await writeFile(`${dir}/private_key_tree${votingFileindex}.dat`, newVotingfile)

  if (await checkFile(`${dir}/private_key_tree${votingFileindex}.dat`)) {
    logger.info(`Voting Key file Create: SUCCESS ${dir}/private_key_tree${votingFileindex}.dat`)
  } else {
    logger.error(`Voting Key file Create: FAILED ${dir}/private_key_tree${votingFileindex}.dat`)
    return
  }
}
