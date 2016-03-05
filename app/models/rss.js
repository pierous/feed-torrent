module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('Rss', {
		
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
		feed: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
	});
}