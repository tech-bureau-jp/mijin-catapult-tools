import { Command } from 'commander'
import voting from '../../infrastructure/voting/votingInfo'
const program = new Command()

program
  .name('info')
  .description('Get Votingkey')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-d, --savedir <dir>', 'Specify the input of Save Voting Key Directory', 'current')
  .action(voting)

export default program
