# check_if_merged



## Uses:

create at your repo root path: .github/workflows/check_if_merged.yml with:

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
    - uses: actions/checkout@v1
    - uses: CareMessagePlatform/check_if_merged
```
