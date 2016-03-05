var request = require('request');
var FeedParser = require('feedparser');
var Entrada = require('../models').Entrada;

var req = request('http://www.newpct1.com/feed');
var feedparser = new FeedParser();

// ERROR url
req.on('error', function (error) {
	console.log('Error request.')
});
	
// OK url
req.on('response', function (res) {
	
	var stream = this;
	if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
	stream.pipe(feedparser);
	
});

// ERROR rss
feedparser.on('error', function(error) {
	// always handle errors
});
	
// OK rss
feedparser.on('readable', function() {
	
	var stream = this;
	var meta = this.meta;
	var item;
	var number = 0;
	
	while (item = stream.read()) {
		
		++number;
		console.log( number + ' ' + item.title);
		console.log(item.categories);
		console.log(item.date);
		console.log(item.link);
		console.log();
		
		var imagen = null;
		if (item.enclosures && item.enclosures.length > 0) {
			imagen = item.enclosures[0].url;
		}
		
		Entrada.create({
			titulo: 	item.title,
			url: 		item.link,
			imagen: 	imagen,
			categoria: 	item.categories.toString(),
			fecha: 		new Date(item.date),
		}).then(function(result) {
	    	console.log('--> Guardado: ' + result.titulo);
	    });
		
	}
});