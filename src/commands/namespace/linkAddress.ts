import { Command } from 'commander'
import linkAddress from '../../infrastructure/namespace/linkAddress'
const program = new Command()

program
  .name('link-address')
  .description('Link Address and Announce Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-a, --address <address>', 'Specify the input of Address')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .action(linkAddress)

export default program
