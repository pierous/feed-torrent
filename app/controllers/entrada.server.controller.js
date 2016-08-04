var Filter = require('../filters/generic.server.filter.js');
var Entrada = require('../models').Entrada;
var downloadService = require('../services/download.server.service');

// Obtiene todas las entradas de la base de datos
exports.findAll = function (req, res) {
	
	var filtro = new Filter();
	
	if (req.query.filtro) {
		var a = JSON.parse(req.query.filtro);
		var fil = new Filter();
		fil.equal('categoriaId', a.categoriaId);
		fil.equal('serieId', a.serieId);
//		if (a.categoriaId) 
			//filtro.add(categoriaId: a.categoriaId);
	}
	
	Entrada.findAll(filtro.getCriteria()).then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.send('Error');
		}
	});
}

// Guarda una entrada en base de datos
exports.save = function(req, res) {
	Entrada.create({
		titulo: req.body.titulo,
		url: req.body.url,
		categoria: req.body.categories,
		fecha: new Date(req.body.fecha),
    }).then(function(result) {
    	res.json(result);
    });
}

// Modifica una entrada de la base de datos
exports.update = function(req, res) {
	Entrada.find({
		where: {
			id: req.params.id
		}
	}).then(function(result) {
		if (result) {
			todo.updateAttributes({
				titulo: req.body.titulo,
				url: req.body.url,
				categoria: req.body.categories,
				fecha: req.body.fecha,
			}).then(function(result) {
				res.send(result);
			});
		}
	});
}

// Elimina una entrada de la base de Datos
exports.delete = function(req, res) {
	Entrada.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.status(500).send({ error: 'Something failed!' });
		}
  });	
}

// Descarga el torrent asociado a una entrada
exports.download = function(req, res) {
	Entrada.find({
		where: {
			id: req.params.id
		}
	}).then(function(result) {
		if (result) {
			 downloadService.download(result, function(torrent) {
				 res.send(torrent); 
			 });
		} else {
			res.status(500).send({ error: 'Something failed!' });
		}
	});
}