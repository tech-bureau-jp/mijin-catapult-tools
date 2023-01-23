import { Command } from 'commander'
import mosaic from '../../infrastructure/mosaic/mosaicCreate'
const program = new Command()

program
  .name('create')
  .description('Create Mosaic and Announce Mosaic Transaction')
  .option('-o, --owner <work|balance|main|test1|test2|other>', 'Specify the input of from Account', 'other')
  .option('-u, --url <mijinCatapultURL>', 'Specify the input of mijin URL')
  .option('-s, --supply <supply>', 'Specify the input of Mosaic Supply', '1')
  .option('-d, --divisibility <divisibility>', 'Specify the input of Mosaic divisibility', '0')
  .option('--supplymutable <supplymutable>', 'Specify the input of Mosaic Flags option supply Mutable', true)
  .option('--transferable <transferable>', 'Specify the input of Mosaic Flags option Transferable', true)
  .option('--restrictable <restrictable>', 'Specify the input of Mosaic Flags option Restrictable', true)
  .option('--revokable <revokable>', 'Specify the input of Mosaic Flags option Revokable', false)
  .option('-r, --readfile <config.json>', 'Specify the input of Read Config File')
  .option('-p, --privatekey <privateKey>', 'Specify the input of Mosaic Owener Account Private Key')
  .action(mosaic)

export default program
