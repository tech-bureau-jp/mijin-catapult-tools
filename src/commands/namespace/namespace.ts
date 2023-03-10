import { Command } from 'commander'
import rootNamespaceCreate from './rootNamespaceCreate'
import subNamespaceCreate from './subNamespaceCreate'
import linkMosaic from './linkMosaic'
import linkAddress from './linkAddress'
import namespaceInfo from './namespaceInfo'

const mosaic = () => {
  const program = new Command('namespace')

  program.description('Namespace Transaction Announce or Info')

  program.addCommand(rootNamespaceCreate)
  program.addCommand(subNamespaceCreate)
  program.addCommand(linkMosaic)
  program.addCommand(linkAddress)
  program.addCommand(namespaceInfo)

  return program
}

export default mosaic
