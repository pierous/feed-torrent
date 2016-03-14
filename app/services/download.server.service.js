var request = require('request');
var fs = require('fs');
var Paso = require('../models').Paso;

function parseUrl(pasos, body) {
	
	var paso = pasos.pop();
	
	var expresion = new RegExp('https?:\/\/.*' + paso.expresion.replace(/\//g, '\\/') + '[^"]*');
	var coincidencias = body.match(expresion);
	var url = null;
	
	if (coincidencias.length > 1) {
		console.error('Se han encontrado mas de una coincidencia.');
	} else if (coincidencias.length === 0) {
		console.error('No se ha encontrado ninguna coincidencia.');
	} else {
		url = coincidencias[0];
	}
	
	return url;
}

function getHtml(pasos, url, callback) {
	
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = parseUrl(pasos, body);
		}
		
		if (pasos.length > 0) {
			getHtml(pasos, result, callback);
		} else {
			callback(result);
		}
	});
}

function saveTorrent(url, titulo) {
	
	var directorio = './torrents/';
	
	// Si el directorio no existe se crea
	if (!fs.existsSync(directorio)) {
		fs.mkdirSync(directorio);
	}
	
	request(url).pipe(fs.createWriteStream(directorio + titulo + '.torrent'));
}

exports.download = function(entrada, callback) {
	
	var url = entrada.url;
	
	Paso.findAll({
		where: {
		    rssId: entrada.rssId,
		},
		order: [
		        ['orden', 'DESC'],
		],
	}).then(function(pasos) {
		
		if (pasos && pasos.length > 0) {
			
			getHtml(pasos, url, function(result) {
				url = result;
				
				callback(url);
			});
		} else {
			console.info('No hay pasos para el rss -> ' + entrada.rssId);
		}
	}).error(function(err) {
		console.error('Error al recuperar lista de pasos para el rss' + entrada.rssId);
	});
}