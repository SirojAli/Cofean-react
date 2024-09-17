#!/bin/bash 
# IF YOU WANT TO USE ONE OF THEM (production), COMMENT OTHER (development).

# PRODUCTION
git reset --hard
git pull origin master

npm i yarn -g
yarn
yarn run build
yarn global add serve  # I added
# pm2 start "yarn run start:prod" --name=COFEAN-REACT
pm2 start yarn --name=COFEAN-REACT -- start:prod


# DEVELOPMENT
# npm i yarn -g
# yarn
# pm2 start "yarn run start" --name=COFEAN-REACT