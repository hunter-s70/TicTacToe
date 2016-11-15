app.controller('TicTacCtrl', function($scope) {
    $scope.pl1 = 'x';
    $scope.pl2 = '​o';
    $scope.currentPlayer = $scope.pl1;
    $scope.rows = [1, 2, 3];
    $scope.cols = $scope.rows;
    $scope.board = {
        '1': {'1': null, '2': null, '3': null},
        '2': {'1': null, '2': null, '3': null},
        '3': {'1': null, '2': null, '3': null}
    };

    $scope.isWinner = function () {
        $scope.scoreCount = {};

        for (var row in $scope.board) {
            $scope.scoreCount[row] = 0;

            for (var col in $scope.board[row]) {
                if ($scope.board[row][col] !== null) {
                    $scope.scoreCount[row] = +col + $scope.scoreCount[row];
                }
            }

        }
        console.log($scope.scoreCount);
    };
});