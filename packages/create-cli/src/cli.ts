import path from 'node:path'
import fs from 'node:fs'
import minimist from 'minimist'
import prompts from 'prompts'
import { cloneTemplate } from './clone'

import {
  reset,
  red
} from 'kolorist'

export type DefaultTarget = {
  dir: string,
  repoPath: string
}

const defaultTarget: DefaultTarget = {
  dir: 'svelte-project',
  repoPath: 'https://github.com/fafayzf/create-svelte-design'
}

const cwd = process.cwd()

export async function create(target: DefaultTarget = { dir: '', repoPath: '' }) {
  const argv = minimist<{
    t?: string
    template?: string
  }>(process.argv.slice(2), { string: ['_'] })

  const argTargetDir = formatTargetDir(argv._[0])

  let targetDir = argTargetDir || target.dir || defaultTarget.dir
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'repoPath'
  >

  try {
    result = await prompts([
      {
        type: argTargetDir ? null : 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: targetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || targetDir
        },
      },
      {
        type: () =>
          !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
        name: 'overwrite',
        message: () =>
          (targetDir === '.'
            ? 'Current directory'
            : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`,
      },
      {
        type: (_, { overwrite }: { overwrite?: boolean }) => {
          if (overwrite === false) {
            throw new Error(red('✖') + ' Operation cancelled')
          }
          return null
        },
        name: 'overwriteChecker',
      },
      {
        type: 'text',
        name: 'packageName',
        message: reset('Package name:'),
        initial: () => toValidPackageName(getProjectName()),
        validate: (dir) =>
          isValidPackageName(dir) || 'Invalid package.json name',
      },
      {
        type: () => (target.repoPath ? null : 'text'),
        name: 'repoPath',
        message: reset('Resource address:'),
        initial: defaultTarget.repoPath
      }
    ])

    const { projectName, overwrite, packageName, repoPath } = result

    const root = path.join(cwd, projectName)
    
    if (overwrite) {
      emptyDir(root)
    } else if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true })
    }

    cloneTemplate(target.repoPath || repoPath, root, projectName, packageName)

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}