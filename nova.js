// include the required node.js packages

var express = require('express');
var http = require('http');
var fs = require('fs');

// set variables for each html page served

var INPUT_FILE = "html/index.html";
var VISION_FILE = "html/vision.html";
var ABOUT_FILE = "html/about.html";
var SUPPORT_FILE = "html/support.html";
var BENEFITS_FILE = "html/benefits.html";

// create the server

console.log('creating the server');

var app = express();

var server = http.createServer(app);

// load the html pages in memory for the server

var home_page = fs.readFileSync(INPUT_FILE, 'utf8');
var vision_page = fs.readFileSync(VISION_FILE, 'utf8');
var about_page = fs.readFileSync(ABOUT_FILE, 'utf8');
//var support_page = fs.readFileSync(SUPPORT_FILE, 'utf8');
//var benefits_page = fs.readFileSync(BENEFITS_FILE, 'utf8');

// create the routes to handle http requests for the individual pages

app.get('/', function(req, res){
    res.send(home_page);
});

app.get('/index.html', function(req, res) {
   res.send(home_page);
});

app.get('/vision.html', function(req, res) {
   res.send(vision_page);
});

app.get('/about.html', function(req, res) {
   res.send(about_page);
});

app.get('/support.html', function(req, res) {
   res.send(support_page);
});

app.get('/benefits.html', function(req, res) {
   res.send(benefits_page);
});

app.get('/ping.html', function(req, res) {
   res.send('alive');
});

// begin listening on the port for traffic

app.listen(8080);

console.log("Listening on 8080");
