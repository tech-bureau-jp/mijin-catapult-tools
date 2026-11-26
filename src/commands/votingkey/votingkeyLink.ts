import { Command } from 'commander'
import voting from '../../infrastructure/voting/votingLink'
const program = new Command()

program
  .name('link')
  .description('Link the latest Votingkey file to the main Account and Announce Transaction')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-d, --savedir <dir>', 'Specify the input of Voting Key Directory', 'current')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Main Account Private Key')
  .option('-b, --bod', 'Specify the input of mijin BOD mode(use Cookie)', false)
  .action(voting)

export default program
