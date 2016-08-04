var Serie = require('../models').Serie;

//Obtiene todas los rss de la base de datos
exports.findAll = function (req, res) {
	Serie.findAll({}).then(function(result) {
		if (result) {
			res.json(result);
		} else {
			res.send('Error');
		}
	});
}

// Guarda un rss en base de datos
exports.save = function(req, res) {
	Serie.create({
		nombre: req.body.nombre,
    }).then(function(result) {
    	res.json(result);
    });
}

// Modifica un rss de la base de datos
exports.update = function(req, res) {
	Serie.find({
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

// Elimina un rss de la base de Datos
exports.delete = function(req, res) {
	Serie.destroy({
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