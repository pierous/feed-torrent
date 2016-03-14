module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('Categoria', {
		
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		
		serie: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		
		rssId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
	}, {
		hooks: {
			beforeCreate: function(categoria) {
				if (categoria.nombre.toLowerCase().includes('serie')) {
					categoria.serie = true;
				} else {
					categoria.serie = false;
				}
			},
		},
	});
}