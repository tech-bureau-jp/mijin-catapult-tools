import { Command } from 'commander'
import namespaceInfo from '../../infrastructure/namespace/namespaceInfo'
const program = new Command()

program
  .name('info')
  .description('Get Namespace Info')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-n, --namespaceId <namespaceId>', 'Specify the input of Namespace Id or Name')
  .option('-b, --bod', 'Specify the input of mijin BOD mode(use Cookie)', false)
  .action(namespaceInfo)

export default program
