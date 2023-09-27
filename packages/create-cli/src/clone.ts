import { simpleGit } from 'simple-git'
import { green } from 'kolorist'
import fs from 'node:fs'
import path from 'node:path'
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
      const targetFilePath = path.join(localPath, PKG_NAME)
      const pkg = JSON.parse(
        fs.readFileSync(targetFilePath, 'utf-8')
      )

      pkg.name = packageName

      fs.writeFileSync(targetFilePath, JSON.stringify(pkg, null, 2) + '\n')

      console.log(green(`cd ${projectName}`))
      console.log(green('npm install'))
      console.log(green('npm run dev'))
    })
    .catch(error => {
      console.error(error)
    })
}