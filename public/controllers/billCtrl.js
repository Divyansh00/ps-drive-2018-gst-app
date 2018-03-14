var myApp = angular.module('myApp', ["ngRoute"]);

myApp.controller('billCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from bill");
    $scope.billing = [];
    $scope.searchProduct = function(id) {
        console.log("search");
        $http.get('/billing/' + id).success(function(response) {
            $scope.billing.push(response[0]);
        });
    }

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.billing, function(product) {
            total += product.total;
        })
        console.log(total);
        return total;
    }
}])