#!/bin/bash

cd ${GITHUB_WORKSPACE}
BRANCH="${2:-${GITHUB_REF#refs/heads/}}"

git checkout $BRANCH
git checkout $1

if [[ "$INPUT_TEST_RUN" =  "true" ]]
then
  GITHUB_SHA=$(git rev-parse $BRANCH)
fi

echo git merge-base $1 $BRANCH
MERGE_BASE=$(git merge-base $1 $BRANCH)

if [[ $MERGE_BASE = $GITHUB_SHA ]]; then
  export DESCRIPTION="$BRANCH is merged into $1 ($INPUT_TEST_RUN)";
  export STATE=0;
else
  export DESCRIPTION="$BRANCH is not merged into $1 ($INPUT_TEST_RUN)";
  export STATE=100;
fi

echo "$DESCRIPTION STATE: $STATE (TEST RUN: $INPUT_TEST_RUN)"

echo ::set-output name=is_merged::$STATE

if [[ $INPUT_TEST_RUN != "true" ]]
then
  exit $STATE
fi
