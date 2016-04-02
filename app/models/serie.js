module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('Serie', {
		
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		
	});
}