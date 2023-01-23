import { Command } from 'commander'
import accountInfo from './accountInfo'
import accountGenerate from './accountGenerate'

const account = () => {
  const program = new Command('account')

  program.description('Account Info or Generate')

  program.addCommand(accountInfo)
  program.addCommand(accountGenerate)

  return program
}

export default account
