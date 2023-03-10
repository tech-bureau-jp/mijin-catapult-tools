import { Command } from 'commander'
import subNamespaceCreate from '../../infrastructure/namespace/subNamespaceCreate'
const program = new Command()

program
  .name('create-sub')
  .description('Create Sub Namespace and Announce Mosaic Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-pn, --parent-name <parent-name>', 'Specify the input of Namespace Parent Name')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .action(subNamespaceCreate)

export default program
