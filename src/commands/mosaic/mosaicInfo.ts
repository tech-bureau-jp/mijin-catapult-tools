import { Command } from 'commander'
import mosaic from '../../infrastructure/mosaic/mosaicInfo'
const program = new Command()

program
  .name('info')
  .description('Get Mosaic Info')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-m, --mosaicrawId <mosaicrawId>', 'Specify the input of Mosaic Id')
  .option('-b, --bod', 'Specify the input of mijin BOD mode(use Cookie)', false)
  .action(mosaic)

export default program
