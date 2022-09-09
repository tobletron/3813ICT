var express = require("express"); //routing
var app = express();

var http = require('http').Server(app);

var path = require('path');


var bodyParser = require("body-parser");  //body-parser
app.use(bodyParser.json);

var cors = require('cors'); //cross origin resource sharing
app.use(cors());


const port = 3000;

app.use(express.static(path.join(__dirname, '../dist/frontend/')));

app.listen(port,() => {
    console.log("listening at port: ", port);
});

