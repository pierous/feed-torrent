app.controller('rssController', function($scope, $http) {
	
	// Obtenemos todos los rss de la base de datos
	$http.get('/api/rss').success(function(data) {
		$scope.feeds = data;
	}).error(function(e) {
		console.log('Error: ' + e);
	});
	
});