module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('Paso', {
		
		orden: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
		expresion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
		rssId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
	});
}