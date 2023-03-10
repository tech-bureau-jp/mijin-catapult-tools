import { Command } from 'commander'
import rootNamespaceCreate from '../../infrastructure/namespace/rootNamespaceCreate'
const program = new Command()

program
  .name('create-root')
  .description('Create Root Namespace and Announce Mosaic Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-d, --duration <duration>', 'Specify the input of Namespace Duration')
  .option('-n, --name <name>', 'Specify the input of Namespace Name')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owner Account Private Key')
  .action(rootNamespaceCreate)

export default program
