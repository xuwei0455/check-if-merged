# check-if-merged GH Action

## Uses:

create at your repo root path: .github/workflows/check_if_merged.yml with:

```
name: Check if branch is merged to staging
on:
  push:
    branches-ignore:
      - 'master'
      - 'staging'
jobs:
  check-if-merged:
    runs-on: ubuntu-latest
    steps:
    - uses: CareMessagePlatform/check-if-merged@v2
```

## make changes

To make the changes valid, you need to build again using `yarn build` to make the distribution version. Run: `yarn build` command, commit the dist files and tag them properly.

## ncc

See why we need to compile all the dependencies in one single JS script: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github
