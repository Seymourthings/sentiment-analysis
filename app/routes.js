// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests}

var priceline = '@priceline';
var expedia = '@expedia';
var orbitz = '@orbitz';
var hipmunk = '@thehipmunk';
var tripAdvisor = '@TripAdvisor';

var twitter = twitterRest();
var url = 'search/tweets';

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
	return alchemy = new AlchemyAPI('0880ad494b53c08f143d791eed5ce64d8354fe2f');
}

function alchemyProcess(statuses){
	var alchemy = alchemyRest();
	var promises = [];
	var augmentStatus;
	//console.log(statuses);
	for(i in statuses){
		var params = {text:statuses[i].text};

		var temp = new Promise(function(resolve, reject){
			// See http://www.alchemyapi.com/api/html-api-1 for format of returned object
			alchemy.emotions("TEXT", params, function(err, response){
				if(err){
					console.log('fail');
					reject();
				}
				// See http://www.alchemyapi.com/api/html-api-1 for format of returned object
			  	var emotions = response.docEmotions;
			  	augmentStatus = statuses[i];
			  	augmentStatus['anger'] = emotions.anger;
			  	
			  	resolve(augmentStatus);
			});
		});
	}
		//resolve(augmentStatus);
		promises.push(temp);

	return Promise.all(promises);
}

function getScore(searchText, res){
	var alchemy = alchemyRest();

	var params = {text: searchText};

	alchemy.emotions("TEXT", params, function(err, response){
		var emotions = response.docEmotions;
		res.send(emotions.anger);
	});
}

function getTweetsFrom(res, company, countWanted){
	var params = {
		q: company
	}
	twitter.get(url, params, function(error, tweets, response){
		alchemyProcess(tweets.statuses).then(function(data){
			console.log(tweets.statuses);
			res.send(data);		
		});
		// alchemyProcess(tweets.statuses);
		res.send(tweets.statuses);
	});
}

function serve(app, res, req){

	app.get('/alchemy', function(req, res){
		console.log(req);
		getScore(req.query.text, res);
	});

	app.get('/twitter', function(req, res) {
		 getTweetsFrom(res,priceline,1);
	});
}

module.exports = serve;
