import * as winston from 'winston'
import { Logger } from 'winston'

export default class LoggerFactory {
  private static _winstonLogger: winston.Logger

  public static getLogger(): Logger {
    LoggerFactory._winstonLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${level}] : ${message}`
        })
      ),
      level: 'debug',
      transports: [new winston.transports.Console()],
    })

    return LoggerFactory._winstonLogger
  }
}
