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
        console.log($scope.model[0].qty);
        var total = 0;
        angular.forEach($scope.billing, function(product) {
            total += (product.price + (product.price * product.gst / 100)) * $scope.model.qty;
        })
        console.log(total);
        return total;
    }
}])