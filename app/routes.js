// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests}

function twitterRest(){
	var twitter = require('twitter');
	var twitterKeys = new twitter({
		consumer_key: 'cp7tvOQo8FohMpW8BWpIth50A',
		consumer_secret: 'HT3R1TuY7qUwcYqJ1NCfseZEownbjrVnVL7u87sZ5qCUQ3J09H', 
		access_token_key: '3660084016-9AAEBVAyxGwoKpqZqG75WYPIXyso3PJngqw6SoR',
		access_token_secret: 'Vf75NCcOV72AyVvJ84QVSCWPSZvQp2SiJbW0GLJt9DPGv'
	});
	return twitterKeys;
}

function alchemyRest(){
	var AlchemyAPI = require('alchemy-api');
	return alchemy = new AlchemyAPI('e1fd7bc4f36090d76a3efb0b0328081e29ab1ec7');
}

function alchemyProcess(statuses){
	var alchemy = alchemyRest();

	return new Promise(function(resolve, reject) {
	  // do a thing, possibly async, then…
		var processed = [];

	  	for(status in statuses){
			var params = {text: status.text};

			alchemy.emotions("TEXT", params, function(err, response) {
			  if (err) throw err;

			  // See http://www.alchemyapi.com/api/html-api-1 for format of returned object
			  var emotions = response.docEmotions;

			  // Do something with data
			  // console.log(emotions);
			  var augmentStatus = statuses[status];
			  augmentStatus['anger'] = emotions.anger;
			  processed.push(augmentStatus);

			  // console.log("current = " + processed.length + " = " + statuses.length);

				if (processed.length === statuses.length) {
					// console.log("success");
					resolve(processed);
				}
			});
		}
	});
}

function serve(app, res, req){
	
	var url = 'search/tweets';
	var params = {
		q: 'priceline',
		count: 2
	}
	var twitter = twitterRest();

	app.get('/twitter', function(req, res) {
		 
		twitter.get(url, params, function(error, tweets, response){
			alchemyProcess(tweets.statuses).then(function(data){
				// console.log('YAAAAY');
				res.send(data);		
			});
		});
	});
}

module.exports = serve;