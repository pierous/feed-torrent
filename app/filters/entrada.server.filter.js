module.exports = {
		
	var page = 0;
	var limit = 10;
	
	var titulo = null;
	var url = null;
	var fechaDesde = null;
	var fechaHasta = null;
	var descargado = null;
	var rssId = null;
	var categoriaId = null;
	var serieId = null;
	
	getFilter : function() {
		filter = filter();
		
		addParam('titulo', '%' + titulo.trim() + '%');
		addParam('rssId', rssId);
		addParam('categoriaId', categoriaId);
		addParam('serieId', serieId);
		
		return filter
	}
	
}

var filter = {};

function filter() {
	filter = {};
	
	filter['where'] = {};
	filter['order'] = ['fecha', 'DESC'];
	filter['limit'] = limit;
	filter['offset'] = limit * page;
	
	return filter;
}

function addParam(name, value) {
	if (value && value.trim() != '') {
		filter.where[name] = value;
	}
}