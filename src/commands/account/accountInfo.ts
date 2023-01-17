import { Command } from 'commander'
import account from '../../infrastructure/account/accountInfo'

const program = new Command()

program
  .name('info')
  .description('Get Account Info')
  .option('-t, --type <work|balance|vrf|voting|other>', 'Specify the type of Account', 'balance')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-a, --address <privateKey>', 'Specify the input of Address')
  .option('-s, --service', 'Specify the input Service Mode', false)
  .action(account)

export default program
