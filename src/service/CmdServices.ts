import { execSync, spawnSync, SpawnSyncOptionsWithStringEncoding } from 'child_process'

export default class CmdServices {
  constructor() {}

  static exec(cmd: string, cmdArgs: string[]) {
    const options: SpawnSyncOptionsWithStringEncoding = {
      encoding: 'utf8',
      timeout: 30,
    }
    const { error, stderr, stdout } = spawnSync(cmd, cmdArgs, options)
    if (error) throw error
    const stderrStr = stderr.toString()
    if (stderrStr) throw new Error(stderrStr)
    return stdout.toString()
  }
}
