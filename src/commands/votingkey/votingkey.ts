import { Command } from 'commander'
import votingCreate from './votingkeyCreate'
import votingInfo from './votingkeyInfo'
import votingUpdate from './votingkeyUpdate'

const votingkey = () => {
  const program = new Command('votingkey')

  program.description('Votingkey Create or Info or Update')

  program.addCommand(votingCreate)
  program.addCommand(votingInfo)
  program.addCommand(votingUpdate)

  return program
}

export default votingkey
