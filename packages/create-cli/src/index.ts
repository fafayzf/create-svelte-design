import cac from 'cac'
import { version } from '../package.json'

export async function create() {
  try {
    const cli = cac('create-svelte-design')
    cli
      .version(version)
      .option('-n, --name <name>', `project name`)
      .option('-p, --path <path>', `project path`)

    const result = cli.parse()
    const args = result.options
    
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

create()