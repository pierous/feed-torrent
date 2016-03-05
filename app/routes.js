var entradaController = require ('./controllers/entrada.server.controller');

module.exports = function(app) {

	/**
	 * ENTRADAS
	 */
	// devolver todas las entradas
	app.get('/api/entrada', entradaController.findAll);
	// Crear una nueva Persona
	app.post('/api/entrada', entradaController.save);
	// Modificar los datos de una Persona
	app.put('/api/entrada/:id', entradaController.update);
	// Borrar una Persona
	app.delete('/api/entrada/:id', entradaController.delete);
	
	
	/**
	 * INDEX
	 */
	// application
	app.get('*', function(req, res) {
		res.sendFile(__dirname + '/../public/index.html'); // Carga única de la vista
	});
};