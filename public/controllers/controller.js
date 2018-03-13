var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'AppCtrl'
        })
        .when('/billing', {
            templateUrl: 'billPage.html',
            controller: 'billCtrl'
        })
        .otherwise({
            redirecTo: '/'
        });
});

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
        $http.get('/productlist').success(function(response) {
            console.log("I recieved the data from server");
            $scope.productlist = response;
            $scope.product = "";
        });
    };

    refresh();

    $scope.addProduct = function() {
        console.log($scope.product);
        $http.post('/productlist', $scope.product).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/productlist/' + id).success(function(response) {
            refresh();
        });
    }

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/productlist/' + id).success(function(response) {
            console.log(response[0]);
            $scope.product = response[0];
        });
    };

    $scope.update = function() {
        console.log($scope.product.id);
        console.log($scope.product);
        $http.put('/productlist/' + $scope.product.id, $scope.product).success(function(response) {
            refresh();
        })
    };

    $scope.deselect = function() {
        $scope.product = "";
    }
}])