## create-svelte-design

- quick start create `svelte-design-template`
- quick start create `svelte-design-admin`
- include `create-svelte-design-cli`

### Method
Manually git clone the remote template
```ts
import { create } from 'create-svelte-design-cli'

create({
  // Remote git address
  repoPath: 'https://github.com/fafayzf/create-svelte-design.git',
  // local directory name
  dir: 'svelte-project'
})

```