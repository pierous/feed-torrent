var Sequelize = require('sequelize');

/**
 * Configuración base de datos
 */
var sequelize = new Sequelize(null, null, null, {
	dialect: 	"sqlite",
	protocol: 	"sqlite",
	port:		null,
	host:		null,
	storage: 	"./bd.sqlite",	// solo SQLite (.env)
	}
);

/**
 * Entidades
 */
var rss = sequelize.import(__dirname + '/models/rss');
var categoria = sequelize.import(__dirname + '/models/categoria');
//var paso = sequelize.import(__dirname + '/models/paso');
var entrada = sequelize.import(__dirname + '/models/entrada');
//var coleccion = sequelize.import(__dirname + '/models/coleccion');

/**
 * Relaciones
 */
categoria.belongsTo(rss, {foreignKey: 'rssId'});
entrada.belongsTo(rss, {foreignKey: 'rssId'});
entrada.belongsTo(categoria, {foreignKey: 'categoriaId'});

/**
 * Exportación de modelos
 */
exports.Rss = rss;
//exports.Paso = paso;
exports.Entrada = entrada;
//exports.Coleccion = coleccion;
exports.Categoria = categoria;

/**
 * Se crea e inicializa la base de datos
 */
sequelize.sync().then(function() {
	// La base de datos se ha inicializado
});
