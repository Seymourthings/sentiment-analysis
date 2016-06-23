angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tagline = 'To the moon and back!';

	// $http({
	// 	method: 'GET',
	// 	url: '/test-api'
	// }).then(function successCallback(response){
	// 	$scope.test = response;
	// 	console.log(response);
	// }, function errorCallback(error){
	// 	console.log('error: '+ error);
	// });

});
