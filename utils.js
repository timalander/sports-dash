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
			startTime : game.startTime,
			location : game.location,
			homeTeam : {
				name : game.home.nameRaw
			},
			awayTeam : {
				name : game.away.nameRaw
			}
		}
	})
}
exports.parseGameData = parseGameData,
exports.parseJSONP = parseJSONP;