var Categoria = require('../models').Categoria;

// Obtiene todas las entradas de la base de datos
exports.findAll = function (req, res) {
	Categoria.findAll({}).then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.send('Error');
		}
	});
}

// Guarda una entrada en base de datos
exports.save = function(req, res) {
	Categoria.create({
		nombre: req.body.nombre,
    }).then(function(result) {
    	res.json(result);
    });
}

// Modifica una entrada de la base de datos
exports.update = function(req, res) {
	Categoria.find({
		where: {
			id: req.params.id
		}
	}).then(function(result) {
		if (result) {
			todo.updateAttributes({
				nombre: req.body.nombre,
			}).then(function(result) {
				res.send(result);
			});
		}
	});
}

// Elimina una entrada de la base de Datos
exports.delete = function(req, res) {
	Categoria.destroy({
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