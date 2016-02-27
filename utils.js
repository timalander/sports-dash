function parseJSONP(rawJSONP, callbackName) {
	var fn = new Function(callbackName, rawJSONP);
	var parsedData;
	fn(function(json) {
		parsedData = json.scoreboard[0];
	})
	return parsedData;
}

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
}

function parseGameTime(rawGameTime, currentPeriod) {
	if (rawGameTime === '') {
		return currentPeriod;
	}
	return rawGameTime;
}
exports.parseGameData = parseGameData,
exports.parseJSONP = parseJSONP;