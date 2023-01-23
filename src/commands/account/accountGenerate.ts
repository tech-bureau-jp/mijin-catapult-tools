import { Command } from 'commander'
import account from '../../infrastructure/account/accountGenerate'
const program = new Command()

program
  .name('generate')
  .description('Generate Account')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-n, --nodename <nodeName>', 'Specify the input of node Name for CA', 'node')
  .option('-c, --certsdir <certDirectory>', 'Specify the input of Cert Directory(Output)')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-w, --writefile <config.json>', 'Specify the input of Write Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Balance Account Private Key')
  .option('-a, --address <privateKey>', 'Specify the input of Address')
  .option('-m, --message <message>', 'Specify the input of Transaction Message(Plain Only)')
  .option('-s, --service', 'Specify the input Service Mode', false)
  .action(account)

export default program
