var app = require('express')(),
    cache = require( "node-cache" ),
	utils = require('./utils.js'),
	path = require('path');

var gameCache = new cache({ stdTTL: 30, checkperiod: 120 });

app.get('/getgames/today', function(req, res) {
	gameCache.get( "today", function(err, value){
	  if( !err ){
	    if(value == undefined){
	    	console.log('[App] Making Request to NCAA CBB API');
	    	utils.getGames(new Date(), function(error, games) {
	    		res.send(games);
				gameCache.set('today', games, function( err, success ){
  					if(err){
    					console.log('[APP] Problem setting cache');
  					}
				});
	    	});
	    }
	    else{
	      res.send(value);
	    }
	  }
	});
});
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.listen('8081');