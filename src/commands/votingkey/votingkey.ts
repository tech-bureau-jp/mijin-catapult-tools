import { Command } from 'commander'
import votingCreate from './votingkeyCreate'
import votingInfo from './votingkeyInfo'
import votingUpdate from './votingkeyUpdate'
import votingLink from './votingkeyLink'

const votingkey = () => {
  const program = new Command('votingkey')

  program.description('Votingkey Create or Info or Update or Link')

  program.addCommand(votingCreate)
  program.addCommand(votingInfo)
  program.addCommand(votingUpdate)
  program.addCommand(votingLink)

  return program
}

export default votingkey
