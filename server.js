var app = require('express')(),
	request = require('request'),
	utils = require('./utils.js'),
	path = require('path'),
	url = 'http://data.ncaa.com/jsonp/scoreboard/basketball-men/d1/2016/02/24/scoreboard.html?callback=ncaa'
app.get('/getgames', function(req, res) {
	request(url, function (error, response, body) {
		if (!error) {
			var json = utils.parseJSONP(body, 'ncaa');
			var games = utils.parseGameData(json.games);
			
			res.send(games);
		} 
		else {
			console.log('We’ve encountered an error: ' + error);
		}
	});
});
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.listen('8081');