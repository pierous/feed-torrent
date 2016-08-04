// Temporada
function getTemporada(titulo) {
	var partes = titulo.toLowerCase().split(' ');
	var index = partes.indexOf('temporada') + 1;
	var temp = partes[index];
	
	return temp;
}

//Capitulo
function getCapitulo(temporada, tag) {
	var cap = tag.match(/\d{2,10}/g)[0];
	cap = cap.replace(temporada, '');
	
	return cap;
}

// Tags
function getTagsInfo(titulo) {
	var tags = [];
	var temporada = null;
	var capitulo = null;
	
	var regExp = new RegExp('[[]' + '[^[]*' + ']', 'gi');
	var tagList = titulo.match(regExp);
	
	tagList.forEach(function(tag) {
		if (tag.toLowerCase().includes('cap')) {
			temporada = parseInt(getTemporada(titulo));
			capitulo = parseInt(getCapitulo(temporada.toString(), tag));
		}else {
			tags.push(tag.replace('[', '').replace(']', ''));
		}
	});
	
	return {
		tags: 		tags,
		temporada: 	temporada,
		capitulo: 	capitulo,
	};
}

exports.getInfo = function(titulo) {
	
	var result = getTagsInfo(titulo);
	
	return result
}
