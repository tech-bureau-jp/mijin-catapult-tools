import { Command } from 'commander'
import linkMosaic from '../../infrastructure/namespace/unlinkMosaic'
const program = new Command()

program
  .name('unlink-mosaic')
  .description('Unlink Mosaic and Announce Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-m, --mosaic-id <mosaic-id>', 'Specify the input of Mosaic Id')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .option('-b, --bod', 'Specify the input of mijin BOD mode(use Cookie)', false)
  .action(linkMosaic)

export default program
