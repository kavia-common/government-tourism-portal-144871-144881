#!/bin/bash
cd /home/kavia/workspace/code-generation/government-tourism-portal-144871-144881/backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

