import { Command } from 'commander'
import mosaicCreate from './mosaicCreate'
import mosaicInfo from './mosaicInfo'

const mosaic = () => {
  const program = new Command('mosaic')

  program.description('Mosaic Transaction Announce or Info')

  program.addCommand(mosaicCreate)
  program.addCommand(mosaicInfo)

  return program
}

export default mosaic
