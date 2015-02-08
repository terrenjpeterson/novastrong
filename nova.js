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
var EXPAND_FILE = "html/expand.html";
var FINANCE_FILE = "html/finance.html";
var PROGRAMS_FILE = "html/programs.html";

// create the server

console.log('creating the server');

var app = express();

var server = http.createServer(app);

// load the html pages in memory for the server

var home_page = fs.readFileSync(INPUT_FILE, 'utf8');
var vision_page = fs.readFileSync(VISION_FILE, 'utf8');
var about_page = fs.readFileSync(ABOUT_FILE, 'utf8');
var expand_page = fs.readFileSync(EXPAND_FILE, 'utf8');
var support_page = fs.readFileSync(SUPPORT_FILE, 'utf8');
var benefits_page = fs.readFileSync(BENEFITS_FILE, 'utf8');
var finance_page = fs.readFileSync(FINANCE_FILE, 'utf8');
var programs_page = fs.readFileSync(PROGRAMS_FILE, 'utf8');

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

app.get('/expand.html', function(req, res) {
   res.send(expand_page);
});

app.get('/finance.html', function(req, res) {
   res.send(finance_page);
});

app.get('/programs.html', function(req, res) {
   res.send(programs_page);
});

// this is the health check service from the infrastructure - do not remove

app.get('/ping.html', function(req, res) {
   res.send('alive');
});

// this is the check from google to verify the site - do not remove

app.get('/google1b3f3010091b833e.html', function(req, res) {
   res.send('google-site-verification: google1b3f3010091b833e.html');
});

// this is for the search engine crawlers - do not remove

app.get('/robots.txt', function(req, res) {
   res.send('User-agent: * /n Allow: /');
});

// begin listening on the port for traffic

app.listen(8080);

console.log("Listening on 8080");
