var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuración method-override
app.use(methodOverride('_method'));

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración directorio app cliente
app.use(express.static(__dirname + '/public'));

// Se cargan las rutas
require('./app/routes.js')(app);

// Se carga el lector del feed
require('./app/services/readerRss.server.service');

// Asignamos el puerto de escucha
app.listen(port);
console.log('Servidor ejecutandose en http://localhost:' + port);

module.exports = app;