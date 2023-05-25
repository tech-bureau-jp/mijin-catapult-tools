import { TransactionMapping } from '@tech-bureau/symbol-sdk'
import { IPayloadOption } from '../../types'
import LoggerFactory from '../../service/Logger'

const logger = LoggerFactory.getLogger()

export default async (option: IPayloadOption) => {
  const { payload } = option
  try {
    const tx = TransactionMapping.createFromPayload(payload)
    console.log(
      '------------------------------------------start decode payload------------------------------------------'
    )
    console.log(JSON.stringify(tx, null, 2))
    console.log(
      '------------------------------------------end decode payload--------------------------------------------'
    )
  } catch (err) {
    logger.error(`Failed to decode payload err message: ${err}`)
  }
  logger.info('End Get Transaction From Payload')
}
