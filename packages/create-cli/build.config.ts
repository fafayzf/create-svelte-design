import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  rollup: {
    esbuild: {
      target: 'node18',
      minify: true,
    },
  },
  alias: {
    // we can always use non-transpiled code since we support node 18+
    prompts: 'prompts/lib/index.js',
  },
})