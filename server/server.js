const express = require("express"); //express
const app = express();
const cors = require("cors"); //cross origin resource sharing 
var http = require("http").Server(app); //http
const fs = require("fs");

const server = require('./listen.js'); //listen.js

const bodyParser = require("body-parser"); //parse requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


server.listen(http, 3000); //start server

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myAssignmentDb";

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);

  require('./routes/login')(app, db); //user authentication
  require('./routes/getUsers')(app, db); //retrive list of all users
  require('./routes/deleteUser')(app, db); //delete a user
});

