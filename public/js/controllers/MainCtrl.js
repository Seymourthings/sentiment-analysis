angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// $scope.tagline = 'To the moon and back!';	

	$scope.tempData = ["asdf", "temp", "data", "derp", "qwer", "desea"];
	$scope.currentFocus = $scope.tempData[0];

	$scope.switchFocus = function(newFocus){
		$scope.currentFocus = newFocus;
	}
});