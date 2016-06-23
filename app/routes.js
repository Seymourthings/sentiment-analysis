// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests

function twitterRest(){
	var twitter = require('twitter');
	var twitterKeys = new twitterAPI({
		consumerKey: 'JA654spy6WFvkyt3nam7LqFCK',
		consumerSecret: 'lUj8Du3qkbolTsbnbe4pNKZgZv730qqdZVzBJuQ87U5jRx8Ewu',
		callback: 'http://127.0.0.1',
	});
	console.log('Everything is dandy so far');
	
}

function serve(app){
	twitterRest();
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}

module.exports = serve;