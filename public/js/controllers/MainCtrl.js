angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tweetData = [];
	$scope.currentFocus = "";

	$scope.switchFocus = function(newFocus){
		$scope.currentFocus = newFocus;
	}

	function getResults(){
		var request = $http({
           	method: "get",
           	url: "./twitter",
           	params: {
               	action: "get"
           	}
       	}).success(function(tweets){
			$scope.tweetData = tweets;
			$scope.currentFocus = $scope.tweetData[0];
			console.log($scope.tweetData);
       	});
	}

	getResults();

});