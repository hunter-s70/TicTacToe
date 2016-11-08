/**
 * Created by hunter_s70 on 31.10.2016.
 */
var app = angular.module('TicTac', []);

app.controller('TicTacCtrl', function($scope) {
    $scope.pl1 = 'X';
    $scope.pl2 = 'O';
});

app.directive('ticTac', function() {
    return {
        restrict : "E",
        templateUrl : 'template/field.html',
        link     : function (scope, element, attrs) {
            scope.makeStep = function () {
                console.log(element);
            }
        }
    }
});