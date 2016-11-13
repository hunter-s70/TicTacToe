app.controller('TicTacCtrl', function($scope) {
    $scope.pl1 = 'x';
    $scope.pl2 = '​o';
    $scope.currentPlayer = $scope.pl1;
    $scope.rows = [0, 1, 2];
    $scope.cols = $scope.rows;
    $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
});