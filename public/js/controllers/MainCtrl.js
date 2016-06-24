angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tempData = ["asdf", "temp", "data", "derp", "qwer", "desea"];
	$scope.currentFocus = $scope.tempData[0];

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
       	});

       	return( request.then( handleSuccess, handleError ) );
	}

	function handleSuccess( response ) {
        return( response.data );
    }

	function handleError( response ) {
		return [];
	}

    $scope.data = getResults();
    console.log($scope.data);
});