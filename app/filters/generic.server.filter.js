// Atributos estáticos
var size = 0;

var LIKE = '$like';

function Filter() {
	
	// Atributos privados
	this._criterias = {};
	
	// Columnas de ordenacion
	this._order = [];
	
	// Atributos públicos
	this.page = 0;
	
}

// Métodos privados
function _addCriteria(value, option) {
	
	if (value) {
		var criteria = {};
		
		if (option) {
			criteria[option] = value;
		} else {
			criteria = value;
		}
		
		return criteria;
	} else {
		return null;
	}
}

// Métodos públicos
Filter.prototype.addCriteria = function(name, value, option) {
	
	var criteria = _addCriteria(value, option);
	
	if (criteria !== null) {
		this._criterias[name] = criteria;
	} else {
		delete(this._criterias[name]);
	}
}

Filter.prototype.equal = function(name, value) {
	this.addCriteria(name, value, null);
}

Filter.prototype.like = function(name, value) {
	var valueLike = null;
	if (value !== null) {
		valueLike = '%' + value + '%';
	}
	this.addCriteria(name, valueLike, LIKE);
}

Filter.prototype.setOrder = function(order) {
	this._order = order;
}

Filter.prototype.getCriteria = function() {
	var filter = {};
	
	filter['where'] = this._criterias;
	
	if (size > 0) {
		filter['limit'] = size;
	}
	
	filter['order'] = [['fecha', 'DESC']];
	
	//filter['order'] = this._order;

	return filter;
}

module.exports = Filter;