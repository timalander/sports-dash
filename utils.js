var request = require('request');

function parseJSONP(rawJSONP, callbackName) {
	var fn = new Function(callbackName, rawJSONP);
	var parsedData;
	fn(function(json) {
		parsedData = json.scoreboard[0];
	})
	return parsedData;
};

function parseGameData(rawData){
	return rawData.map(function(game) {
		return {
			id : game.id,
			state : game.gameState,
			isLive : game.gameState === 'live',
			isFinal : game.gameState === 'final',
			isUpcoming : game.gameState === 'pre',
			startTime : game.startTime,
			location : game.location,
			homeTeam : {
				name : game.home.nameRaw,
				score : game.home.currentScore,
				color : game.home.color,
				icon : game.home.iconURL
			},
			awayTeam : {
				name : game.away.nameRaw,
				score : game.away.currentScore,
				color : game.away.color,
				icon : game.away.iconURL
			},
			currentGameTime : parseGameTime(game.timeclock, game.currentPeriod)
		}
	})
};

function parseGameTime(rawGameTime, currentPeriod) {
	if (rawGameTime === '') {
		return currentPeriod;
	}
	return rawGameTime;
};

function getApiDateString(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	if (m < 10) {
		m = '0' + m;
	}
	var d = date.getDate();
	if(d < 10) {
		d = '0' + d;
	}
	return y + '/' + m + '/' + d;
};

function getGames(date, callback) {
	var urlPrefix = 'http://data.ncaa.com/jsonp/scoreboard/basketball-men/d1/';
	var urlSuffix = '/scoreboard.html?callback=ncaa';
	var url = urlPrefix + getApiDateString(date) + urlSuffix;

	request(url, function (error, response, body) {
		if (!error) {
			var json = parseJSONP(body, 'ncaa');
			var games = parseGameData(json.games);
      		callback(null, games);
		} 
		else {
			callback(error);
		}
	});


};

exports.getGames = getGames;