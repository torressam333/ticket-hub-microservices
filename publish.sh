#!/bin/bash

function addcommitpush () {

current=$(git branch | grep "*" | cut -b 3-)

message=\'"$@"\'
git add -A && git commit -a -m "$message"

if [ -z "$message" ]; then
  echo "Missing commit message"
  exit;
else
  echo "Thanks for the commit message"
fi

echo "Where to push?"
read -i "$current" -e branch

echo "You sure you wanna push? (y/n)"
read -i "y" -e yn

cd ./common
npm version patch
npm run build
npm publish

if [ "$yn" = y ]; then
  git push origin "$branch"
else
  echo "Have a nice day!"
fi

}

addcommitpush $1
