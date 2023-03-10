import { Command } from 'commander'
import linkMosaic from '../../infrastructure/namespace/linkMosaic'
const program = new Command()

program
  .name('link-mosaic')
  .description('Link Mosaic and Announce Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-m, --mosaic-id <mosaic-id>', 'Specify the input of Mosaic Id')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .action(linkMosaic)

export default program
