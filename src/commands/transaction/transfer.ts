import { Command } from 'commander'
import transfer from '../../infrastructure/transaction/transfer'
const program = new Command()

program
  .name('transfer')
  .description('Announce Transfer Transaction')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-f --from <work|balance|Privatekey>', 'Specify the input of from Account')
  .option('-d --dest <work|balance|Address>', 'Specify the input of to Destination Address')
  .option('-m --mosaic <mosaic>', 'Specify the input of Mosaic Id', 'cat.currency')
  .option('-a --amount <amount>', 'Specify the input of transaction type', '0')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File', 'config.json')
  .action(transfer)

export default program
