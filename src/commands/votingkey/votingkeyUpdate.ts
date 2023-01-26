import { Command } from 'commander'
import voting from '../../infrastructure/voting/votingUpdate'
const program = new Command()

program
  .name('update')
  .description('Update Votingkey')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-s, --startepoch <72>', 'Specify the input of Voting Start Epoch', '72')
  .option('-e, --endepoch <1>', 'Specify the input of Voting Stop Epoch', '26280')
  .option('-d, --savedir <dir>', 'Specify the input of Save Voting Key Directory', 'current')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Voting Account Private Key')
  .action(voting)

export default program
