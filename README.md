# lawHive App Backend 

## Install

`yarn`

## DB Setup Local

Create .env and set `DATABASE_URL` and `PORT` to your liking.

## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL.

## Story 1 

- Create backend git repo: y
- Create local development database: y
- Create initial test api route: y 
- Test GET request on postman: y 
- Create heroku database: y
- Connect back end to heroku: y  
- Test GET request for heroku on postman: y 
- Set up GET and POST routes for story 1: y 

Notes of Database Design: 


# Story 2 

- Alter SQL database locally and remotely using Beekeeper Studio: y
- Alter post request: y
- test in Postman: y

# Story 3

- Alter SQL database locally to add amountpaid (decimal(6,2)) and settlementamount (decimal(6,2): y
- Add PUT request to api routes: y 
- Test local:
- Alter SQL database remote as above: 
- Test Remote: 

Bug issues: 

Put request recieving error at front end. Checked query in database and it works correctly. Checked in Postman and get response CANNOT PUT. Error must be in server. 
Resolved, server needed to be restarted locally. 