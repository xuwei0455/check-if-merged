# check_if_merged

## Uses:

```
on:
  push:
    branches-ignore:
      - 'master'
      - 'staging'
jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1`
    - uses: actions/check_if_merged
```
