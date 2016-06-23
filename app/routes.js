var request = require('request');

// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests
function requestURL(req, res, next){
	var baseURL = 'https://api.twitter.com/1.1/search/tweets.json';
	var username = '%23freebandnames';
	var search = baseURL+'q='+username;
}

function twitterRest(){
	var twitter = require('twitter');
	var twitterKeys = new twitter({
		consumer_key: 'cp7tvOQo8FohMpW8BWpIth50A',
		consumer_secret: 'HT3R1TuY7qUwcYqJ1NCfseZEownbjrVnVL7u87sZ5qCUQ3J09H', 
		access_token_key: '3660084016-9AAEBVAyxGwoKpqZqG75WYPIXyso3PJngqw6SoR',
		access_token_secret: 'Vf75NCcOV72AyVvJ84QVSCWPSZvQp2SiJbW0GLJt9DPGv'
	});
	requestURL();
}


function serve(app, res, req){
	twitterRest();
	app.get('/twitter', function(req, res) {
		request({
					url: 'https://gateway-a.watsonplatform.net/calls/url/URLGetCombinedData?url=http://www.cnbc.com/2016/05/16/buffetts-berkshire-hathaway-takes-new-stake-in-apple.html&outputMode=json&extract=keywords,entities,concepts&sentiment=1&maxRetrieve=3&apikey=e1fd7bc4f36090d76a3efb0b0328081e29ab1ec7',
				},
				function(err,response, body){
					if(!err && response.statusCode == 200){
						res.send(body);
						console.log(JSON.stringify(body, null, 2));
					}
					else{
						console.log('An error occured');
					}		
				}
		);
		//res.sendfile('./public/index.html');
	});
}

module.exports = serve;