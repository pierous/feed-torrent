module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('Entrada', {
		
		titulo: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
		imagen: {
			type: DataTypes.STRING,
		},
		
		fecha: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		
		descargado: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		
		rssId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
		categoriaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
		serieId: {
			type: DataTypes.INTEGER,
			defaultValue: null,
		},
		
	});
}