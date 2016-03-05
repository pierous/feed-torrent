var rssController = require ('./controllers/rss.server.controller');
var entradaController = require ('./controllers/entrada.server.controller');

module.exports = function(app) {
	
	/**
	 * RSS
	 */
	// devolver todos los rss
	app.get('/api/rss', rssController.findAll);
	// Crear un noevo rss
	app.post('/api/rss', rssController.save);
	// Modificar los datos de un rss
	app.put('/api/rss/:id', rssController.update);
	// Borrar un rss
	app.delete('/api/rss/:id', rssController.delete);

	/**
	 * ENTRADA
	 */
	// devolver todas las entradas
	app.get('/api/entrada', entradaController.findAll);
	// Crear una nueva entrada
	app.post('/api/entrada', entradaController.save);
	// Modificar los datos de una entrada
	app.put('/api/entrada/:id', entradaController.update);
	// Borrar una entrada
	app.delete('/api/entrada/:id', entradaController.delete);
	
	
	/**
	 * INDEX
	 */
	// application
//	app.get('*', function(req, res) {
//		res.sendFile(__dirname + '/../public/index.html'); // Carga única de la vista
//	});
};