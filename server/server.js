const express = require("express"); //express
const app = express();
const cors = require("cors"); //cross origin resource sharing 
var http = require("http").Server(app); //http
const fs = require("fs");
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }
});

const server = require('./listen.js'); //listen.js
const sockets = require('./socket.js'); //socket.js

const bodyParser = require("body-parser"); //parse requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

sockets.connect(io, 3000); //setup socket
server.listen(http, 3000); //start server

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myAssignmentDb";

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);

  //user routes
  require('./routes/UserRoutes/login')(app, db); //user authentication
  require('./routes/UserRoutes/getUsers')(app, db); //retrive list of all users
  require('./routes/UserRoutes/deleteUser')(app, db); //delete a user
  require('./routes/UserRoutes/insertUser')(app, db); //insert a user

  //group routes
  require('./routes/GroupRoutes/insertGroup')(app, db); //create a group
  require('./routes/GroupRoutes/getGroups')(app, db); //retrive list of all groups
  require('./routes/GroupRoutes/deleteGroup')(app, db); //delete a group

  //channel routes
  require('./routes/ChannelRoutes/insertChannel')(app, db); //create a channel
  require('./routes/ChannelRoutes/getChannels')(app, db); //retrieve a list of all channels
  require('./routes/ChannelRoutes/deleteChannel')(app, db); //delete a channel


});

