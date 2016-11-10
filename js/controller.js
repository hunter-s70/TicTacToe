app.controller('TicTacCtrl', function($scope) {
    $scope.pl1 = 'X';
    $scope.pl2 = 'O';
    $scope.step = '';
    $scope.rows = [0, 1, 2];
    $scope.cols = $scope.rows;
});