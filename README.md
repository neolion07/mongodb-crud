About this app...
=
This a simple application that implements basic
CRUD operations (create, read, update, delete) on
a MongoDB database.

Requirements
=

* Node.js >= 18.0 (see `package.json` for details)
* MongoDB Compass
* Postman/Insomnia

How to use
=

1. Set up a MongoDB connection with Compass
2. Start the server with
   ~~~bash
   $ npm run dev
   ~~~
4. Open Postman or Insomnia. You can make HTTP
   requests to:
   ~~~
   http://localhost:3000/api/weather
   ~~~
   For PUT and single GET requests, you need to
   specify an ID for a MongoDB document:
   ~~~
   http://localhost:3000/api/weather/<id>
   ~~~
