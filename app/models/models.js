var Sequelize = require('sequelize');

var sequelize = new Sequelize(null, null, null, {
	dialect: 	"sqlite",
	protocol: 	"sqlite",
	port:		null,
	host:		null,
	storage: 	"./bd.sqlite",	// solo SQLite (.env)
	}
);

//var rss = sequelize.import(__dirname + '/rss');
//var paso = sequelize.import(__dirname + '/paso');
var entrada = sequelize.import(__dirname + '/entrada');
//var coleccion = sequelize.import(__dirname + '/coleccion');
//var categoria = sequelize.import(__dirname + '/categoria');

//exports.Rss = rss;
//exports.Paso = paso;
exports.Entrada = entrada;
//exports.Coleccion = coleccion;
//exports.Categoria = categoria;

// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function() {

});
