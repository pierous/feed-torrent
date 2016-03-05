var request = require('request');
var FeedParser = require('feedparser');
var number = 0;
var Entrada = require('../models/models').Entrada;

console.log('READER RSS');

var req = request('http://www.newpct1.com/feed')
  , feedparser = new FeedParser();

	req.on('error', function (error) {
	  console.log('Error request.')
	});
	req.on('response', function (res) {
	  var stream = this;

	  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

	  stream.pipe(feedparser);
	});


	feedparser.on('error', function(error) {
	  // always handle errors
	});
	feedparser.on('readable', function() {
	  // This is where the action is!
	  var stream = this
	    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
	    , item;

	  while (item = stream.read()) {
			++number;
			console.log( number + ' ' + item.title);
			console.log(item.categories);
			console.log(item.date);
	    console.log(item.link);
			console.log();
			Entrada.create({
	      titulo: item.title,
	      url: item.link,
        categoria: item.categories.toString(),
        fecha: new Date(item.date)
	    }).then(function(result) {
	      console.log('--> Guardado: ' + result.titulo);
	    });
	  }
	});
