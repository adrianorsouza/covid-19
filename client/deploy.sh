#!/usr/bin/env bash

CURRENT_DIR=$PWD

echo "CURRENT_DIR: ${CURRENT_DIR}"

DATE=$(date +%Y-%m-%dT%H:%M)
rm -rf /tmp/covid19
npm run build

if [[ ! -d /tmp/covid19 ]]; then
  mkdir -p /tmp/covid19/client/public
  cd /tmp/covid19
  git init
  git remote add origin adriano:/gitserver/covid19.adrianorosa.git
fi

cd $CURRENT_DIR

#rm -rf /tmp/public
cp -r build/* /tmp/covid19/client/public/
cd /tmp/covid19

STATUS=`git status --porcelain`

# avoid error when the there is no changes in the repo
if [[ ! ${STATUS} ]]; then
  echo "GIT HAS NO CHANGES"
  exit 0;
fi

git add --all
git commit -m "new build ${DATE}"
git push -f origin master
