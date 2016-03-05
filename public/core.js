angular.module('MainApp', [])

function mainController($scope, $http) {
	$scope.newPersona = {};
	$scope.personas = {};
	$scope.selected = false;

	// Obtenemos todos los datos de la base de datos
	$http.get('/api/entrada').success(function(data) {
		$scope.personas = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Función para registrar a una persona
	$scope.registrarPersona = function() {
		$http.post('/api/entrada', $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.personas = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una persona
	$scope.modificarPersona = function(newPersona) {
		$http.put('/api/entrada/' + $scope.newPersona.id, $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.personas = data;
				$scope.selected = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona conocido su id
	$scope.borrarPersona = function(newPersona) {
		$http.delete('/api/entrada/' + $scope.newPersona.id)
		.success(function(data) {
			$scope.newPersona = {};
			$scope.personas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que desgarga torrent de la entrada seleccionada
	$scope.downloadTorrent = function(id) {
		$http.get('' + id)
		.success(function(data){
			// No se hace nada?
		})
		.error(function(data) {
			console.log('Error' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};
}
