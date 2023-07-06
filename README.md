# Storefront Backend Project

## How to connect to database

run `yarn watch` or `npm run watch`

## To start project
To start the project run `yarn` or `npm i`

## Running Postgres in Terminal
1. open a wsl terminal
2. sudo service postgresql status
3. sudo service postgresql start      (or restart with: sudo service postgresql restart)
4. sudo service postgresql status     (this should say: "14/main (port 5432): online")
5. sudo su - postgres                 (if its just "sudo postgres" then it will be root and will not have all permissions. If it is just "su postgres" then it will stay at the same directory and have all permissions, but adding sudo will take it to the root)
6. psql
Then your are inside the postgres terminal

## running ports:

# server port

http://localhost:3000/

0.0.0.0:3000

# Database Port
5432

## endpoints

All of the endpoints are explained within requirements.md

## tests

To test run `yarn test` or `npm run test`