import { IVotingCreateOption } from '../../types'
import LoggerFactory from '../../service/Logger'
import RepositoryFactory from '../../service/RepositoryFactory'
import { VotingUtils } from '../../service/VotingServices'
import { readConfig, checkFile, writeFile, checkDir, createDir } from '../../utils'
import userEnv from 'userEnv'

const logger = LoggerFactory.getLogger()

export default async (option: IVotingCreateOption) => {
  const { url, readfile, startepoch, endepoch, savedir, privatekey, bod } = option

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
    logger.error(`No URL mode: ${mijinUrl}`)
    repo = undefined
  }

  // (VotingSetGroup(180) * maxVotingKeyLifetime(26280)) / ( 60 / blockGenerationTargetTime * 60 * 24)
  // 180 * 26280 / (60 /15 * 60 * 24) = 821日
  const networkProperties = repo ? repo.getNetworkProperties() : undefined

  const votingSetGroup = userEnv.mijin.voting.votingSetGroup
  const maxVotingKeyLifetime = networkProperties
    ? Number(networkProperties.chain.maxVotingKeyLifetime)
    : endepoch
    ? Number(endepoch)
    : userEnv.mijin.voting.endEpoch
  const blockGenerationTargetTime = networkProperties
    ? Number(networkProperties.chain.blockGenerationTargetTime?.replace('s', ''))
    : null

  const votingUtil = new VotingUtils()

  const dir = savedir === 'current' ? process.cwd() : savedir

  const votingPrivateKey = privatekey ? privatekey : configFile ? configFile.keylink.voting.privateKey : undefined

  if (!votingPrivateKey) {
    logger.error('Not Found Voting Private Key')
    return
  }

  let votingFiles
  let votingMaxEpoch
  let votingStartEpoch
  let votingEndEpoch

  logger.info('Start Voting Key Create...')

  votingMaxEpoch = repo
    ? Math.max(repo.getEinalizationEpoch(), startepoch ? Number(startepoch) : 0, 72)
    : startepoch
    ? Number(startepoch)
    : userEnv.mijin.voting.startEpoch
  votingStartEpoch = votingMaxEpoch
  votingEndEpoch = repo ? votingMaxEpoch + maxVotingKeyLifetime : maxVotingKeyLifetime

  logger.info(`votingSetGroup: ${votingSetGroup}`)
  logger.info(`votingMaxEpoch: ${votingMaxEpoch}`)
  logger.info(`votingStartEpoch: ${votingStartEpoch}`)
  logger.info(`votingEndEpoch: ${votingEndEpoch}`)
  logger.info(`blockGenerationTargetTime: ${blockGenerationTargetTime}`)

  const votingfile = await votingUtil.createVotingFile(votingPrivateKey, votingStartEpoch, votingEndEpoch)

  if (savedir !== 'current' && !(await checkDir(dir))) {
    await createDir(dir)
    logger.info('Create Cert Directory: ' + dir, null, '  ')
  }
  await writeFile(`${dir}/private_key_tree1.dat`, votingfile)

  if (await checkFile(`${dir}/private_key_tree1.dat`)) {
    logger.info(`Voting Key file Create: SUCCESS ${dir}/private_key_tree1.dat`)
  } else {
    logger.error(`Voting Key file Create: FAILED ${dir}/private_key_tree1.dat`)
    return
  }
}
