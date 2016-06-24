angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tweetData = [];
	$scope.currentFocus = "";

	$scope.toggleImage = function(){
		$scope.active = true;
		$scope.expActive = false;
		$scope.hipActive = false;
		$scope.orbActive = false;
	}

	$scope.toggleExpImage = function(){
		$scope.expActive = true;
		$scope.active = false;
		$scope.hipActive = false;
		$scope.orbActive = false;
	}

	$scope.toggleHipImage = function(){
		$scope.hipActive = true;
		$scope.expActive = false;
		$scope.active = false;
		$scope.orbActive = false;
	}

	$scope.toggleOrbImage = function(){
		$scope.orbActive = true;
		$scope.expActive = false;
		$scope.active = false;
		$scope.hipActive = false;
	}

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
