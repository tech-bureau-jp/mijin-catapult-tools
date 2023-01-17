import { promises as fs } from 'fs'
import { ConfigFile } from './types'

export const readConfig = async (filename: string): Promise<ConfigFile> => {
  return JSON.parse(await fs.readFile(filename, 'utf-8'))
}

export const writeConfig = async (filename: string, data: string) => {
  return await fs.writeFile(filename, data, 'utf-8')
}

export const writeFile = async (filename: string, data: string | Uint8Array) => {
  return await fs.writeFile(filename, data, 'utf-8')
}

export const readFile = async (filename: string) => {
  return await fs.readFile(filename, 'utf-8')
}

export const checkFile = async (filename: string) => {
  try {
    return !!(await fs.lstat(filename))
  } catch (e) {
    return false
  }
}

export const checkDir = async (filepath: string) => {
  try {
    return !!(await fs.lstat(filepath))
  } catch (e) {
    return false
  }
}

export const createDir = async (dirpath: string) => {
  return await fs.mkdir(dirpath, { recursive: true })
}
