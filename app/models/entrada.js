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
		
		categoria: {
			type: DataTypes.STRING,
			allowNull: false,
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
		
		RssId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		
	});
}