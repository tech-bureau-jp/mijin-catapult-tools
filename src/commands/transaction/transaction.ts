import { Command } from 'commander'
import transfer from './transfer'
import status from './transactionStatus'
import mosaic from '../mosaic/mosaic'

const votingkey = () => {
  const program = new Command('transaction')

  program.description('Transaction Announce or Info')

  program.addCommand(transfer)
  program.addCommand(status)
  program.addCommand(mosaic())

  return program
}

export default votingkey
