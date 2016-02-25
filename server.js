var app = require('express')(),
	request = require('request'),
	utils = require('./utils.js')
	url = 'http://data.ncaa.com/jsonp/scoreboard/basketball-men/d1/2016/02/25/scoreboard.html?callback=ncaa'
app.get('/', function(req, res) {
	request(url, function (error, response, body) {
		if (!error) {
			var json = utils.parseJSONP(body, 'ncaa')
			var games = utils.parseGameData(json.games);
			res.send(games);
		} 
		else {
			console.log('We’ve encountered an error: ' + error);
		}
	});
})
app.listen('8081');