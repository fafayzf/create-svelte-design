import process from 'node:process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

export const PKG_NAME = 'package.json'

// ROOT
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const PACKAGE_JSON_FILE = join(ROOT, PKG_NAME)

export function findRootDir(dir: string) {
  if (existsSync(join(dir, PKG_NAME))) {
      return dir
  }
  const parentDir = dirname(dir)
  if (dir === parentDir) {
      return dir
  }
  return findRootDir(parentDir)
}

