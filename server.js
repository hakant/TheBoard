var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//var ejsEngine = require("ejs-locals");
var vash = require("vash");
var controllers = require("./controllers");

var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");


// Setup the view engine
//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine);   // suppor master pages
//app.set("view engine", "ejs");  // ejs view engine
app.set("view engine", "vash");

// Opt into services

// set the static public resources folder
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "PluralsightTheBoard" }));
app.use(flash());

// use authentication
var auth = require("./auth");
auth.init(app);

// Map the routes
controllers.init(app);

app.get("/api/users", function(req, res) {

  res.set("Content-Type", "application/json");
  res.send({
    name: "Hakan",
    isValid: true,
    group: "Admin"
  });
});

var server = http.createServer(app);
server.listen(3000);

var updater = require("./updater");
updater.init(server);
