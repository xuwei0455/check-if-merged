#!/bin/bash

cd ${GITHUB_WORKSPACE}

SHA=$(git show-ref --hash $INPUT_SOURCE_REF)

echo git merge-base $INPUT_DESTINATION_BRANCH $SHA
MERGE_BASE=$(git merge-base $INPUT_DESTINATION_BRANCH $SHA)

if [[ $MERGE_BASE = $SHA ]]; then
  VERB="is";
  STATE=0;
else
  VERB="is not";
  export STATE=100;
fi

echo "$INPUT_SOURCE_REF ($SHA) $VERB merged into $INPUT_DESTINATION_BRANCH || STATE: $STATE TEST_RUN: $INPUT_TEST_RUN"

echo ::set-output name=is_merged::$STATE

if [[ $INPUT_TEST_RUN != "true" ]]
then
  exit $STATE
fi
