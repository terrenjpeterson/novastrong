// include the required node.js packages

var express = require('express');
var http = require('http');
var fs = require('fs');
var AWS = require('aws-sdk');

// set variables for each html page served

var INPUT_FILE    = "html/index.html";
var VISION_FILE   = "html/vision.html";
var ABOUT_FILE    = "html/about.html";
var SUPPORT_FILE  = "html/support.html";
var BENEFITS_FILE = "html/benefits.html";
var CORP_FILE     = "html/corporate.html";
var INDIVID_FILE  = "html/individual.html";
var EXPAND_FILE   = "html/expand.html";
var FINANCE_FILE  = "html/finance.html";
var PROGRAMS_FILE = "html/programs.html";
var CONTACT_FILE  = "html/contact.html";
var VIDEO_FILE    = "html/video.html";
var DRAWINGS_FILE = "html/drawings.html";
var INVOLVE_FILE  = "html/involvement.html";
var COMMNTY_FILE  = "html/community.html";

// create the server

console.log('creating the server');

var app = express();

var server = http.createServer(app);

// load the html pages in memory for the server

var home_page     = fs.readFileSync(INPUT_FILE, 'utf8');
var vision_page   = fs.readFileSync(VISION_FILE, 'utf8');
var about_page    = fs.readFileSync(ABOUT_FILE, 'utf8');
var expand_page   = fs.readFileSync(EXPAND_FILE, 'utf8');
var support_page  = fs.readFileSync(SUPPORT_FILE, 'utf8');
var benefits_page = fs.readFileSync(BENEFITS_FILE, 'utf8');
var corp_page     = fs.readFileSync(CORP_FILE, 'utf8');
var individ_page  = fs.readFileSync(INDIVID_FILE, 'utf8');
var finance_page  = fs.readFileSync(FINANCE_FILE, 'utf8');
var programs_page = fs.readFileSync(PROGRAMS_FILE, 'utf8');
var contact_page  = fs.readFileSync(CONTACT_FILE, 'utf8');
var video_page    = fs.readFileSync(VIDEO_FILE, 'utf8');
var drawings_page = fs.readFileSync(DRAWINGS_FILE, 'utf8');
var involve_page  = fs.readFileSync(INVOLVE_FILE, 'utf8');
var commnty_page  = fs.readFileSync(COMMNTY_FILE, 'utf8');

// this gets static files linked so that they may be served in get requests

app.use('/js', express.static(__dirname + '/js'));

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

app.get('/individual.html', function(req, res) {
   res.send(individ_page);
});

app.get('/corporate.html', function(req, res) {
   res.send(corp_page);
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

app.get('/contact.html', function(req, res) {
   res.send(contact_page);
});

app.get('/video.html', function(req, res) {
   res.send(video_page);
});

app.get('/drawings.html', function(req, res) {
   res.send(drawings_page);
});

app.get('/involvement.html', function(req, res) {
   res.send(involve_page);
});

app.get('/community.html', function(req, res) {
   res.send(commnty_page);
});

// this is the health check service from the infrastructure - do not remove

app.get('/ping.html', function(req, res) {
   res.send('alive');
});

// this is the check from google to verify the site - do not remove

app.get('/google1b3f3010091b833e.html', function(req, res) {
   console.log('received google verification code');
   res.send('google-site-verification: google1b3f3010091b833e.html');
});

// this is for the search engine crawlers - do not remove

app.get('/robots.txt', function(req, res) {
   console.log('received request for robots file');
   res.send('User-agent: * /n Allow: /');
});

// this route serves as an API to create an e-mail capturing a question from a contact source

app.post('/sendQuestion', function(request, response) {
  console.log('receieved send Question request');

  // first receive the new message string coming in from the request
  var questionData = "";

  request.on("data", function(chunk) {
    questionData += chunk;
  });

  request.on("end", function() {
    // body of message has been fully received

    console.log('received data to create a new question : ' + questionData);
    newQuestion = eval('(' + questionData + ')');

    // create an e-mail alerting of the question

    var params = {
      MessageBody: questionData,
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/034353605017/NOVAStrongContact', 
      DelaySeconds: 0
      };

    console.log('parameters object: ' + JSON.stringify(params));

    var sqs = new AWS.SQS({region: 'us-west-2'});

    sqs.sendMessage(params, function(err, data) {
      if(err)
         console.log('error: ' + err + ' more info: ' +  err.stack);
      else
         console.log('success: ' + JSON.stringify(data));
    });

    // create a thank you response e-mail back to the sender

    var thanksMail = {};
        thanksMail.From = 'info@novastrong.org';
        thanksMail.To = newQuestion.emailAddress;
        thanksMail.Subject = 'Question Submitted to NOVA Strong Website';
        thanksMail.HtmlBody = newQuestion.firstName + ' ' + newQuestion.lastName + '<br><br>' +
                              'Thank you for contacting NOVA.  For your reference, here is a copy of the message ' +
                              'posted to our website today from this e-mail address.  We will be responding shortly ' +
                              'with more information as you have requested.<br><br>' +
                              '<b>Topic: </b>' + newQuestion.contactTopic + '<br>' +
                              '<b>Msg: </b>' + newQuestion.msg + '<br><br>' +
                              'Sincerely - <br>Drawrz.com<br><br>';

//    postmark.send(thanksMail, function(err, success) {
//      if(err)
//        console.log('Unable to send via postmark: ' + err.message)
//      else
//        console.log('Sent to postmark responding to : ' + newQuestion.emailAddress)
//    });

  });
  response.send();
});

// begin listening on the port for traffic

app.listen(8080);

console.log("Listening on 8080");
