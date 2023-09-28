import { simpleGit, SimpleGitProgressEvent  } from 'simple-git'
import { green, yellow } from 'kolorist'
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
  console.log(yellow('download loading...\n'))
  simpleGit({ progress })
    .clone(repoPath, localPath, ['--progress'])
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

function progress({
  method, 
  stage, 
  progress
}: SimpleGitProgressEvent) {
  console.log(`git.${method} ${green(stage)} stage ${progress === 100 ? green(progress + '%') : yellow(progress + '%')} complete\n`);
}