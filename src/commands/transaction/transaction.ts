import { Command } from 'commander'
import transfer from './transfer'
import status from './transactionStatus'
import mosaic from '../mosaic/mosaic'
import namespace from '../namespace/namespace'
import payload from './payload'

const transaction = () => {
  const program = new Command('transaction')

  program.description('Transaction Announce or Info')

  program.addCommand(transfer)
  program.addCommand(status)
  program.addCommand(payload)
  program.addCommand(mosaic())
  program.addCommand(namespace())

  return program
}

export default transaction
