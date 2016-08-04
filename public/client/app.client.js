var app = angular.module('feedTorrentClient', ['ngRoute']).config(function($routeProvider) {
	$routeProvider
	.when('/entrada', {
		templateUrl: 'client/views/entrada.html',
		controller: 'entradaController',
	})
	.when('/rss', {
		templateUrl: 'client/views/rss.html',
		controller: 'rssController',
	})
});