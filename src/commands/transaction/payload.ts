import { Command } from 'commander'
import payload from '../../infrastructure/transaction/payload'
const program = new Command()

program
  .name('payload')
  .description('Get Transaction Info From Payload')
  .requiredOption('-p, --payload <string>', 'Transaction Payload')
  .action(payload)

export default program
