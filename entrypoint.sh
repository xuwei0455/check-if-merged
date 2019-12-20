#!/bin/sh

cd ${GITHUB_WORKSPACE}
MERGE_BASE=$(git merge-base remotes/origin/$1 remotes/origin/${GITHUB_REF##*/})
if [[ $MERGE_BASE = $GITHUB_SHA ]]; then
  export DESCRIPTION="$GITHUB_REF is merged into staging";
  export STATE=0;
else
  export DESCRIPTION="$GITHUB_REF is not merged into staging";
  export STATE=100;
fi
echo $DESCRIPTION

echo ::set-output name=is_merged::$STATE
