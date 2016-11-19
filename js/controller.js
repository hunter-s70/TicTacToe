//Points Table
//  1 | 2 | 3
// ---|---|---
//  1 | 2 | 3
// ---|---|---
//  1 | 2 | 3
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
        $scope.diagonalSumm = 0;
        $scope.diagonalSummReflect = 0;
        $scope.countRowScore = {};
        $scope.countColScore = {};
        $scope.colScoreSumm = {};

        //loop for count row score
        //if player put value in first column  --> 1 point
        //if player put value in second column --> 2 point
        //if player put value in third column  --> 3 point
        for (var row in $scope.board) {
            $scope.countColScore[row] = {};
            $scope.countRowScore[row] = 0;

            for (var col in $scope.board[row]) {
                $scope.countColScore[row][col] = 0;

                //check if player put value on game board
                if ($scope.board[row][col] !== null  && $scope.board[row][col] !== $scope.currentPlayer) {
                    $scope.countRowScore[row] = +col + $scope.countRowScore[row];
                    $scope.countColScore[row][col] = +col + $scope.countColScore[row][col];
                }

                //if player have 6 score in row
                if ($scope.countRowScore[row] === 6) {
                    swal('Any fool can use a computer');
                }
            }
        }

        //count points in columns
        //if player put value in first column  --> 1 point
        //if player put value in second column --> 2 point
        //if player put value in third column  --> 3 point
        for (var row in $scope.countColScore) {
            $scope.colScoreSumm[row] = 0;
            for (var col in $scope.countColScore[row]) {
                $scope.colScoreSumm[row] += $scope.countColScore[col][row];
            }

            //check if player have
            // 3 points in first column
            // 6 points in second column
            // 9 points in third column
            if ($scope.colScoreSumm[row] === row*3) {
                alert('win');
            }
        }

        //check diagonals
        for (var row in $scope.countColScore) {
            $scope.diagonalSumm += $scope.countColScore[row][row];
            $scope.diagonalSummReflect += $scope.countColScore[row][4-row];
        }

        //check if player have 6 points in diagonal
        if ($scope.diagonalSumm === 6 || $scope.diagonalSummReflect === 6) {
            alert('win');
        }
    };
});

var elem = document.querySelector('.btn');
elem.addEventListener('click', function() {
    swal('Any fool can use a computer');
});