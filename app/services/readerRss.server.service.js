var request = require('request');
var FeedParser = require('feedparser');
var Sequelize = require('sequelize');
var Parser = require('../utils/parser.js');

// MODELOS
var Entrada = require('../models').Entrada;
var Categoria = require('../models').Categoria;
var Serie = require('../models').Serie;
var Rss = require('../models').Rss;

var cache = [];
var interval = null;

Rss.findAll({}).then(function(result) {
	if (result) {
		result.forEach(readRss);
	} else {
		console.log('Error al recuperar lista de RSS');
	}
}).error(function(err) {
	console.error('No hay feeds para leer. -> ' + err);
});


function readRss(rssFeed) {
	
	var req = request(rssFeed.feed);
	var feedparser = new FeedParser();

	// ERROR url
	req.on('error', function (e) {
		console.error('Error request. ' + e);
	});
	
	// OK url
	req.on('response', function (res) {
	
		var stream = this;
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		stream.pipe(feedparser);
	});

	// ERROR rss
	feedparser.on('error', function(e) {
		console.error('Error read feed. ' + e);
	});
	
	// OK rss
	feedparser.on('readable', function() {
	
		var stream = this;
		var meta = this.meta;
		var item;
	
		while (item = stream.read()) {
		
			console.log( cache.length + ' - ' + item.title);
			console.log();
			
			var imagen = null;
			if (item.enclosures && item.enclosures.length > 0) {
				imagen = item.enclosures[0].url;
			}
			
			var entrada = {
				titulo: 		item.title,
				url: 			item.link,
				imagen: 		imagen,
				fecha: 			new Date(item.date),
				rssId: 			rssFeed.id,
				categoria: 		item.categories.toString(),
			};
			
			cache.push(entrada);
		}
		
		if (!interval) {
			interval = setTimeout(checkCache, 30000);
		}
		
	});
	
}

function checkCache() {
	
	interval = null;
	
	if (cache.length > 0) {
		
		var entrada = cache.pop();
		crearCategoria(entrada);
	}
}

function crearCategoria(entrada) {
	
	Categoria.findOrCreate({
		where: {
			nombre: entrada.categoria,
		}, defaults: {
			rssId: 	entrada.rssId,
		}
	}).spread(function(categoria, created) {
		if (created) {
			console.info('Se ha creado la categoría ' + categoria.nombre);
		}
		entrada.categoriaId = categoria.id;
		
		if (categoria.serie) {
			crearSerie(entrada);
		} else {
			crearEntrada(entrada);
		}
	}).catch(function (e) {
		console.error('No se ha podido guardar la categoria. ' + e);
		checkCache();
	});
}

function crearSerie(entrada) {
	
	var nombreSerie = entrada.titulo.split('-')[0].trim();

	Serie.findOrCreate({
		where: {
			nombre: nombreSerie,
		}
	}).spread(function(serie, created) {
		if (created) {
			console.info('Se ha creado la serie ' + serie.nombre);
		}
		
		entrada.serieId = serie.id;
		
		crearEntrada(entrada);
	}).catch(function (e) {
		console.error('No se ha podido guardar la serie. ' + e);
		checkCache();
	});
}

function crearEntrada(entrada) {
	
	var info = Parser.getInfo(entrada.titulo);
	
	Entrada.create({
		titulo: 		entrada.titulo,
		url: 			entrada.url,
		imagen: 		entrada.imagen,
		fecha: 			entrada.fecha,
		categoriaId: 	entrada.categoriaId,
		serieId:		entrada.serieId,
		temporada:		info.temporada,
		capitulo:		info.capitulo,
		rssId: 			entrada.rssId,
	}).then(function(result) {
		console.info('--> Guardado: ' + result.titulo);
	}).catch(function(e) {
		console.error('No se ha podido guardar la entrada "' + entrada.titulo + '". ' + e);
	}).finally(function() {
		checkCache();
	});
}