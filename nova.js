// include the required node.js packages

var express = require('express');
var http = require('http');
var fs = require('fs');
var AWS = require('aws-sdk');

// bring in framework of html pages that is common across the site

var HEADER_FILE = "framework/header.html";
var NAVBAR_FILE = "framework/navbar.html";
var FOOTER_FILE = "framework/footer.html";

// set variables for each html page served

var INPUT_FILE    = "html/index.html";
var VISION_FILE   = "html/vision.html";
var ABOUT_FILE    = "html/about.html";
var SUPPORT_FILE  = "html/support.html";
var BENEFITS_FILE = "html/benefits.html";
var CORP_FILE     = "html/corporate.html";
var NEWS_FILE     = "html/news.html";
var INDIVID_FILE  = "html/individual.html";
var FINANCE_FILE  = "html/finance.html";
var PROGRAMS_FILE = "html/programs.html";
var CONTACT_FILE  = "html/contact.html";
var VIDEO_FILE    = "html/video.html";
var PLEDGE_FILE   = "html/pledge.html";
var DRAWINGS_FILE = "html/drawings.html";
var INVOLVE_FILE  = "html/involvement.html";
var COMMNTY_FILE  = "html/community.html";
var DONORS_FILE   = "html/donors.html";
var GROWTH_FILE   = "html/growth.html";
var CALC_FILE     = "html/calculator.html";
var RESULTS_FILE  = "html/results.html";

var SITEMAP_FILE  = "xml/sitemap.xml";

var PLEDGE_CARD   = "https://s3-us-west-2.amazonaws.com/novaphotos/NOVAPowerPledgeCard.pdf";

// create the server

console.log('creating the server');

var app = express();

var server = http.createServer(app);

// load the framework pages in memory

var heading = fs.readFileSync(HEADER_FILE, 'utf8');
var navbar  = fs.readFileSync(NAVBAR_FILE, 'utf8');
var footer  = fs.readFileSync(FOOTER_FILE, 'utf8');

// load the html pages in memory for the server

var home_page     = fs.readFileSync(INPUT_FILE, 'utf8');
var vision_page   = fs.readFileSync(VISION_FILE, 'utf8');
var about_page    = fs.readFileSync(ABOUT_FILE, 'utf8');
var support_page  = fs.readFileSync(SUPPORT_FILE, 'utf8');
var benefits_page = fs.readFileSync(BENEFITS_FILE, 'utf8');
var corp_page     = fs.readFileSync(CORP_FILE, 'utf8');
var news_page     = fs.readFileSync(NEWS_FILE, 'utf8');
var individ_page  = fs.readFileSync(INDIVID_FILE, 'utf8');
var finance_page  = fs.readFileSync(FINANCE_FILE, 'utf8');
var programs_page = fs.readFileSync(PROGRAMS_FILE, 'utf8');
var contact_page  = fs.readFileSync(CONTACT_FILE, 'utf8');
var video_page    = fs.readFileSync(VIDEO_FILE, 'utf8');
var pledge_page   = fs.readFileSync(PLEDGE_FILE, 'utf8');
var drawings_page = fs.readFileSync(DRAWINGS_FILE, 'utf8');
var involve_page  = fs.readFileSync(INVOLVE_FILE, 'utf8');
var commnty_page  = fs.readFileSync(COMMNTY_FILE, 'utf8');
var donors_page   = fs.readFileSync(DONORS_FILE, 'utf8');
var growth_page   = fs.readFileSync(GROWTH_FILE, 'utf8');
var calc_page     = fs.readFileSync(CALC_FILE, 'utf8');
var results_page  = fs.readFileSync(RESULTS_FILE, 'utf8');

var sitemap       = fs.readFileSync(SITEMAP_FILE, 'utf8');

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
   res.send(heading + navbar + vision_page);
});

app.get('/about.html', function(req, res) {
   res.send(heading + navbar + about_page);
});

app.get('/support.html', function(req, res) {
   res.send(heading + navbar + support_page);
});

app.get('/benefits.html', function(req, res) {
   res.send(heading + navbar + benefits_page);
});

app.get('/individual.html', function(req, res) {
   res.send(heading + navbar + individ_page);
});

app.get('/corporate.html', function(req, res) {
   res.send(heading + navbar + corp_page);
});

app.get('/finance.html', function(req, res) {
   res.send(heading + navbar + finance_page);
});

app.get('/programs.html', function(req, res) {
   res.send(heading + navbar + programs_page);
});

app.get('/contact.html', function(req, res) {
   res.send(contact_page);
});

app.get('/video.html', function(req, res) {
   res.send(heading + navbar + video_page);
});

app.get('/pledge.html', function(req, res) {
   res.send(heading + navbar + pledge_page);
});

app.get('/drawings.html', function(req, res) {
   res.send(heading + navbar + drawings_page);
});

app.get('/involvement.html', function(req, res) {
   res.send(heading + navbar + involve_page);
});

app.get('/community.html', function(req, res) {
   res.send(heading + navbar + commnty_page);
});

app.get('/donors.html', function(req, res) {
   res.send(heading + navbar + donors_page);
});

app.get('/growth.html', function(req, res) {
   res.send(heading + navbar + growth_page);
});

app.get('/news.html', function(req, res) {
   res.send(heading + navbar + news_page + footer);
});

// this is the angular page that will provide a cost calculator

app.get('/calculator.html', function(req, res) {
   res.send(calc_page);
});

app.get('/calculator', function(req, res) {
   res.send(calc_page);
});

// this is a temp page and will be moved to another site

app.get('/results', function(req, res) {
   res.send(results_page);
});

// this it to handle the sitemap checking from search engines

app.get('/sitemap.xml', function(req,res) {
   res.send(sitemap);
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
