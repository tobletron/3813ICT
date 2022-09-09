var express = require("express"); //express
var app = express();

var http = require("http").Server(app); //http

const cors = require("cors"); //cross origin resource sharing 
app.use(cors());

const https = require("https");
const url = require('url');
const fs = require("fs");

const users = require("./data/user.json");
const groups = require("./data/groups.json");
const channels = require("./data/channels.json");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve on port 3000
var PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


//user login response
app.post("/api/auth", (req, res) => {
    var user_data = users.find((user) => user.username == req.body.username && user.password == req.body.password);
    //console.log(user_data);
    if (user_data){ //if the user is valid
        res.send(user_data);
        console.log("user logged in: " + user_data.username);
    }
});

app.post("/api/group", (req, res) => {
  var group_data = groups.find((group) => group.id == req.body.groupID);
  console.log("here");
  if (group_data) { 
    res.send(group_data);
  }
});




//test by going to localhost:3000 to see if server working
app.get("/", (req, res) => {
    res.send("server is working");
  });

