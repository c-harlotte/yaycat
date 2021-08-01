#!/bin/bash

cd /home/charlotte/yaycat
git pull
npm init
yarn cleanbuild
pm2 reload app
