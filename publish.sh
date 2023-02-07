#!/bin/bash

function addcommitpush () {

current=$(git branch | grep "*" | cut -b 3-)

echo "Enter your message"
read message

git add . && git commit -m "${message}"

if [ -z "$message" ]; then
  echo "Missing commit message"
  exit;
else
  echo "Thanks for the commit message"
fi

if [ -n "$(git status - porcelain)" ];
then
 echo "IT IS CLEAN"
else
echo "Where to push?"
read -i "$current" -e branch

echo "You sure you wanna push? (y/n)"
read -i "y" -e yn

cd ./common

echo "You sure you wanna patch, build and publish to npm? (y/n)"
read -i "y" -e yn

npm version patch
npm run build
npm publish
 fi
 
if [ "$yn" = y ]; then
  git push origin "$branch"
else
  echo "Have a nice day!"
fi

}

addcommitpush $1
