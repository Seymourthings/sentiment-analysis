// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests}

const priceline = '@priceline';
const expedia = '@expedia';
const orbitz = '@orbitz';
const hipmunk = '@thehipmunk';
const tripAdvisor = '@TripAdvisor';


var pricelineTweet;
var expediaTweet;
var orbitzTweet;
var hipmunkTweet;
var tripAdvisorTweet;

var twitter = twitterRest();

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


function expediaTweets(){
	var url = 'search/tweets';
	var params = {
		q: expedia,
		count: '2'
	}
	
	twitter.get(url, params, function(error, tweets, response){
		expediaTweet = pullText(tweets, params);
		console.log(expediaTweet);
	});
}

function orbitzTweets(){
	var url = 'search/tweets';
	var params = {
		q: orbitz,
		count: '2'
	}
	twitter.get(url, params, function(error, tweets, response){
		orbitzTweet = pullText(tweets, params);
		console.log(orbitzTweet);	
	});
}

function hipmunkTweets(){
	var url = 'search/tweets';
	var params = {
		q: hipmunk,
		count: '2'
	}
	twitter.get(url, params, function(error, tweets, response){
		hipmunkTweet = pullText(tweets, params);
		console.log(hipmunkTweet);	
	});
}

function tripAdvisorTweets(){
	var url = 'search/tweets';
	var params = {
		q: orbitz,
		count: '2'
	}
	twitter.get(url, params, function(error, tweets, response){
		tripAdvisorTweet = pullText(tweets, params);
		console.log(tripAdvisorTweets);	
	});
}



function pullText(tweets, params){	
	var tweetText = [];
	for (var status in tweets.statuses){
		tweetText.push(tweets.statuses[status].text);
	}
	return tweetText;
}

function serveTweets(app){
	app.get('/twitter', function(req, res){
		orbitzTweets();
		expediaTweets();
		tripAdvisorTweets();
		hipmunkTweets();
		res.send(' ');
	});
}

module.exports = serveTweets;