#!/bin/bash

cd ${GITHUB_WORKSPACE}
REF="remotes/origin/${GITHUB_REF#refs/heads/}"

MERGE_BASE=$(git merge-base remotes/origin/$1 $REF)
if [[ $MERGE_BASE = $GITHUB_SHA ]]; then
  export DESCRIPTION="$REF is merged into staging";
  export STATE=0;
else
  export DESCRIPTION="$REF is not merged into staging";
  export STATE=100;
fi
echo $DESCRIPTION

echo ::set-output name=is_merged::$STATE
exit $STATE
