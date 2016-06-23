// server routes ===========================================================
// handle things like api calls
// authentication routes

// frontend routes =========================================================
// route to handle all angular requests

function serve(app){
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}

module.exports = serve;