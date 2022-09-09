var express = require("express"); //routing
var app = express();

var http = require('http').Server(app);

var bodyParser = require("body-parser");  //body-parser
app.use(bodyParser.json);

const port = 3000;


app.use(express.static(__dirname + ''));

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server listening on: " + host + " port:" + port); 
});

app.get("/", (req, res) => {
    console.log("Server is running at port", port);
    res.send("hello world");
  });


