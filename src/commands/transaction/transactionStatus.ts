import { Command } from 'commander'
import transactionStatus from '../../infrastructure/transaction/transactionStatus'
const program = new Command()

program
  .name('status')
  .description('Get Transaction Status')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File', 'config.json')
  .option('-t, --transactionhash <transactionHash>', 'Specify the input of Transaction Hash')
  .action(transactionStatus)

export default program
