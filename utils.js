function parseJSONP(rawJSONP, callbackName) {
	var fn = new Function(callbackName, rawJSONP);
	var parsedData;
	fn(function(json) {
		parsedData = json.scoreboard[0];
	})
	return parsedData;
}

function parseGameData(rawData){
	return rawData.map( function(game) {
		return {
			id : game.id,
			state : game.gameState,
			isLive : game.gameState === 'live',
			isFinal : game.gameState === 'final',
			isUpcoming : game.gameState === 'isUpcoming',
			startTime : game.startTime,
			location : game.location,
			homeTeam : {
				name : game.home.nameRaw,
				score : game.home.currentScore,
				color : game.home.color
			},
			awayTeam : {
				name : game.away.nameRaw,
				score : game.away.currentScore,
				color : game.away.color
			},
			currentGameTime : game.timeclock
		}
	})
}
exports.parseGameData = parseGameData,
exports.parseJSONP = parseJSONP;