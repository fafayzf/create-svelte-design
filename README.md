## create-svelte-design

- quick start create [`svelte-design-template`](https://github.com/fafayzf/create-svelte-design/blob/main/packages/create-svelte-design-template/README.md), script `npx create svelte-design-template`
- quick start create [`svelte-design-admin`](https://github.com/fafayzf/create-svelte-design/blob/main/packages/create-svelte-design-admin/README.md), script `npx create svelte-design-admin`
- include `create-svelte-design-cli`

### Method
Manually git clone the remote template
```ts
// index.ts/index.js
import { create } from 'create-svelte-design-cli'

create({
  // Remote git address，you can fill in any remote address, not necessarily the current template address
  repoPath: 'https://github.com/fafayzf/create-svelte-design.git',
  // local directory name
  dir: 'svelte-project'
})

```
> Use `esno` to execute the `index.ts` script or use `node` to execute the `index.js` script`