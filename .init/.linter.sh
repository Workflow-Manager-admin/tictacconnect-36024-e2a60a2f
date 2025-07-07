#!/bin/bash
cd /home/kavia/workspace/code-generation/tictacconnect-36024-e2a60a2f/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

