app.controller('entradaController', function($scope, $http) {
	
	// Obtenemos todas las categorias de la base de datos
	$http.get('/api/categoria').success(function(data) {
		$scope.categorias = data;
	}).error(function(e) {
		console.error('Error: ' + e);
	});
	
	// Obtenemos todas las series de la base de datos
	$http.get('/api/serie').success(function(data) {
		$scope.series = data;
	}).error(function(e) {
		console.error('Error: ' + e);
	});
	
	// Obtenemos todas las entradas de la base de datos
	$http.get('/api/entrada').success(function(data) {
		$scope.entradas = data;
	}).error(function(e) {
		console.error('Error: ' + e);
	});
	
	// Función que desgarga torrent de la entrada seleccionada
	$scope.findEntradas = function() {
		var params = { filtro : $scope.filtro };
		$http.get('/api/entrada', { params : params })
		.success(function(result) {
			$scope.entradas = result;
		})
		.error(function(data) {
			console.log('Error' + data);
		});
	};
	
	// Función que desgarga torrent de la entrada seleccionada
	$scope.downloadTorrent = function(id) {
		$http.get('/api/entrada/download/' + id)
		.success(function(result) {
			window.location.href = result;
		})
		.error(function(data) {
			console.log('Error' + data);
		});
	};
	
});