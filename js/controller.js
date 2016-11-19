//Points Table
//  1 | 2 | 3
// ---|---|---
//  1 | 2 | 3
// ---|---|---
//  1 | 2 | 3
// -----------------------------------------------
//if player put value in first column  ---> 1 point
//if player put value in second column ---> 2 point
//if player put value in third column  ---> 3 point
app.controller('TicTacCtrl', function($scope, $timeout) {
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
        $scope.fullCellCount = 0;
        $scope.diagonalSumm = 0;
        $scope.diagonalSummReflect = 0;
        $scope.countRowScore = {};
        $scope.countColScore = {};
        $scope.colScoreSumm = {};

        //loop for count row score
        for (var row in $scope.board) {
            $scope.countColScore[row] = {};
            $scope.countRowScore[row] = 0;

            for (var col in $scope.board[row]) {
                $scope.countColScore[row][col] = 0;

                //check if player put value on game board
                if ($scope.board[row][col] !== null  && $scope.board[row][col] === $scope.currentPlayer) {
                    $scope.countRowScore[row] = +col + $scope.countRowScore[row];
                    $scope.countColScore[row][col] = +col + $scope.countColScore[row][col];
                }

                //if player have 6 score in row
                if ($scope.countRowScore[row] === 6) {
                    $scope.alertResult($scope.currentPlayer);
                }

                //if all cells is full
                if ($scope.board[row][col] !== null) {
                    $scope.fullCellCount++;
                }
            }
        }

        //count points in columns and diagonals
        for (var row in $scope.countColScore) {
            $scope.colScoreSumm[row] = 0;
            $scope.diagonalSumm += $scope.countColScore[row][row];
            $scope.diagonalSummReflect += $scope.countColScore[row][4-row];

            for (var col in $scope.countColScore[row]) {
                $scope.colScoreSumm[row] += $scope.countColScore[col][row];
            }

            //check if player have
            if ($scope.colScoreSumm[row] === row*3 || $scope.diagonalSumm === 6 || $scope.diagonalSummReflect === 6) {
                $scope.alertResult($scope.currentPlayer);
            }
        }

        if ($scope.fullCellCount === 9) {
            $scope.alertResult();
        }

        //togpe player
        if ($scope.currentPlayer === $scope.pl1) {
            $scope.currentPlayer = $scope.pl2;
        } else {
            $scope.currentPlayer = $scope.pl1;
        }
    };

    $scope.alertResult = function (winner) {
        if (winner) {
            swal(winner.toUpperCase() + ' winner!');
        } else {
            swal('draws');
        }
        $scope.clearBoard();
    };

    $scope.clearBoard = function () {
        $scope.fullCellCount = 0;
        $scope.currentPlayer = $scope.pl2;
        for (var row in $scope.board) {
            for (var col in $scope.board[row]) {
                $scope.board[row][col] = null;
            }
        }
    };
});