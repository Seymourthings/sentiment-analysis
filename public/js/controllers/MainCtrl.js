angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tweetData = [];
	$scope.currentFocus = "";

	$scope.switchFocus = function(newFocus){
		$scope.currentFocus = newFocus;
	}

	function getResults(){
		$http({
           	method: "get",
           	url: "./twitter",
           	params: {
               	action: "get"
           	}
       	}).success(function(tweets){
			$scope.tweetData = tweets;

			$scope.currentFocus = $scope.tweetData[0];
			console.log($scope.tweetData);

				for(i in $scope.tweetData){
					console.log('derp');
					$scope.tweetData[i]['anger'] = getScore($scope.tweetData[i]);
				}
       	});
	}

	function getScore(data){
		$http({
           	method: "get",
           	url: "./alchemy",
           	params: {
               	action: "get",
               	text: data.text
           	}
       	}).success(function(score){
       		console.log(score);
			return score;
       	});
	}

	getResults();

});