import { simpleGit } from 'simple-git'
import { green } from 'kolorist'
import fs from 'node:fs'
import path from 'node:path'
import { rimraf } from 'rimraf'
// import ora from 'ora'

// const spinner = ora('Download loading...')

const PKG_NAME = 'package.json'

export function cloneTemplate(
  repoPath: string, 
  localPath: string, 
  projectName: string, 
  packageName: string
) {
  // spinner.start()
  simpleGit()
    .clone(repoPath, localPath)
    .then(() => {
      // Manually delete the .git directory, no good package found yet
      const gitDir = path.join(localPath, '.git')
      fs.existsSync(gitDir) && rimraf(gitDir)

      const targetFilePath = path.join(localPath, PKG_NAME)
      const pkg = JSON.parse(
        fs.readFileSync(targetFilePath, 'utf-8')
      )

      pkg.name = packageName
      fs.writeFileSync(targetFilePath, JSON.stringify(pkg, null, 2) + '\n')

      console.log(green(`\n1. cd ${projectName}`))
      console.log(green('2. install using npm, pnpm, yarn'))
      console.log(green('3. If there is a startup command, it can be executed, for example: npm run dev'))
    })
    .catch(error => {
      console.error(error)
    })
}