import { Command } from 'commander'
import linkAddress from '../../infrastructure/namespace/unlinkAddress'
const program = new Command()

program
  .name('unlink-address')
  .description('Unlink Address and Announce Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-a, --address <address>', 'Specify the input of Address')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .option('-b, --bod', 'Specify the input of mijin BOD mode(use Cookie)', false)
  .action(linkAddress)

export default program
