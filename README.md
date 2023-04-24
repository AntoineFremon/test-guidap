# test-guidap
Coding Assessment NodeJS Fullstack

## Backend and database
Get started with the [backend](/backend/README.md)

## Frontend
Get started with the [frontend](/frontend/README.md)

## Project setup
Once your code is up and running, you have to do things in this order:
1. Create your admin user
   1. Access directly your database (for example via adminer) and create a new entry is the `users` table
   2. Fill all fields, using `getPwdInfo.js` for `hash` & `salt`
2. Use the API to create one or more activities via the route `POST /activities`
   1. You HAVE TO input the name and description if the activity
   2. You CAN input an image (via a public url)
3. Use the API to create several leisure bases via the route `POST /leisures`
   1. You HAVE TO input the name and description of the leisure base
   2. If you want to see them on the map, fill the address field
4. Go to your Front-end and enjoy!
