// modules =================================================
var express        = require('express');
var request 			 = require('request');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: 'e1fd7bc4f36090d76a3efb0b0328081e29ab1ec7'
});
// configuration ===========================================

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================

//twitterData will be an array of objects
var twitterData = [{},{},{}];

app.get('/test-api', function(req,res) {

  //twitterData.length or set a maximum number
  for(var i = 0; i < twitterData.length; i++){
    var params = {
    	text: twitterData[i].XXXXXX
    };

    alchemy_language.sentiment(params, function (err, response) {
      if (err)
        res.render('error');
      else
        res.send(response);
    });
  }

});

// app.get('/test-api', function(req,res) {
// 	// var query = {
// 	// 	term: req.query.term
// 	// };
// 	request(
// 		{
// 			url: 'https://gateway-a.watsonplatform.net/calls/url/URLGetCombinedData?url=http://www.cnbc.com/2016/05/16/buffetts-berkshire-hathaway-takes-new-stake-in-apple.html&outputMode=json&extract=keywords,entities,concepts&sentiment=1&maxRetrieve=3&apikey=e1fd7bc4f36090d76a3efb0b0328081e29ab1ec7'
// 		},
// 		function(err, response, body) {
// 			if(!err && response.statusCode === 200) {
// 				res.send(body);
// 				console.log(JSON.stringify(body, null, 2));
// 			} else {
// 				res.render('error');
// 			}
// 		});
// });

app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
