var Sequelize = require('sequelize');

/**
 * Configuración base de datos
 */
var sequelize = new Sequelize(null, null, null, {
	dialect: 	"sqlite",
	protocol: 	"sqlite",
	port:		null,
	host:		null,
	storage: 	"./bd-1.sqlite",	// solo SQLite (.env)
	}
);

/**
 * Entidades
 */
var rss = sequelize.import(__dirname + '/models/rss');
var paso = sequelize.import(__dirname + '/models/paso');
var categoria = sequelize.import(__dirname + '/models/categoria');
var serie = sequelize.import(__dirname + '/models/serie');
var entrada = sequelize.import(__dirname + '/models/entrada');

/**
 * Relaciones
 */
categoria.belongsTo(rss, {foreignKey: 'rssId'});
paso.belongsTo(rss, {foreignKey: 'rssId'});
entrada.belongsTo(rss, {foreignKey: 'rssId'});
entrada.belongsTo(categoria, {foreignKey: 'categoriaId'});
serie.hasMany(entrada, {as: 'capitulos', foreignKey: 'serieId'});

/**
 * Exportación de modelos
 */
exports.Rss = rss;
exports.Paso = paso;
exports.Categoria = categoria;
exports.Serie = serie;
exports.Entrada = entrada;

/**
 * Se crea e inicializa la base de datos
 */
sequelize.sync().then(function() {
	// La base de datos se ha inicializado
});
