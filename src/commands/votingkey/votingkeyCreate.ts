import { Command } from 'commander'
import voting from '../../infrastructure/voting/votingCreate'
const program = new Command()

program
  .name('create')
  .description('Create Votingkey')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-s, --startepoch <72>', 'Specify the input of Voting Start Epoch', '72')
  .option('-e, --endepoch <1>', 'Specify the input of Voting Stop Epoch', '26280')
  .option('-d, --savedir <dir>', 'Specify the input of Save Voting Key Directory', 'current')
  .action(voting)

export default program
