import { Command } from 'commander'
import account from './commands/account/account'
import voting from './commands/votingkey/votingkey'
import transaction from './commands/transaction/transaction'
;(async () => {
  const program = new Command()

  program
    .name('mijin-catapult-tools')
    .description('This tool allows you to easily operate mijin Catapult')
    .version('0.1.5')

  program.addCommand(account())
  program.addCommand(voting())
  program.addCommand(transaction())

  await program.parseAsync(process.argv)
})()
