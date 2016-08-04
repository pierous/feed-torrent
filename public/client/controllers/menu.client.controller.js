app.controller('menuController', function($scope, $location) {
	
	$scope.opcion = 'entrada';
	$location.path('/entrada');
	
	$scope.cambiarMenu = function(element) {
		$('#' + $scope.opcion).removeClass('active');
		$scope.opcion = element;
		$('#' + $scope.opcion).addClass('active');
	}
	
});