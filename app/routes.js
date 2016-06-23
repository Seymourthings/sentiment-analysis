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


function serve(app, res, req){
	
	var url = 'search/tweets';
	var params = {
		q: 'priceline'
	}
	var twitter = twitterRest();

	app.get('/twitter', function(req, res) {
		 
		twitter.get(url, params, function(error, tweets, response){
			res.send(tweets);	
		});
	});
}

module.exports = serve;