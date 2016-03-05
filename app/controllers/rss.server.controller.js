var Rss = require('../models').Rss;

//Obtiene todas los rss de la base de datos
exports.findAll = function (req, res) {
	Rss.findAll({}).then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.send('Error');
		}
	});
}

// Guarda un rss en base de datos
exports.save = function(req, res) {
	Rss.create({
		nombre: req.body.nombre,
		url: req.body.url,
		feed: req.body.feed,
    }).then(function(result) {
    	res.json(result);
    });
}

// Modifica un rss de la base de datos
exports.update = function(req, res) {
	Rss.find({
		where: {
			id: req.params.id
		}
	}).then(function(result) {
		if (result) {
			todo.updateAttributes({
				nombre: req.body.nombre,
				url: req.body.url,
				feed: req.body.feed,
			}).then(function(result) {
				res.send(result);
			});
		}
	});
}

// Elimina un rss de la base de Datos
exports.delete = function(req, res) {
	Rss.destroy({
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