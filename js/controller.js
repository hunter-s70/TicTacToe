//Points Table
//  1 | 1 | 1
// ---|---|---
//  1 | 1 | 1
// ---|---|---
//  1 | 1 | 1
// -----------------------------------------------
//if player put value in column  ---> 1 point
app.controller('TicTacCtrl', function($scope, $timeout) {
    $scope.audioEffects = {
        draws: 'audio/draws.wav',
        winner: 'audio/winner.wav',
        player1: 'audio/tiny-1.wav',
        player2: 'audio/tiny-2.wav'
    };
    $scope.pl1 = {
        simbol: 'x',
        audio: $scope.audioEffects.player1
    };
    $scope.pl2 = {
        simbol: 'o',
        audio: $scope.audioEffects.player2
    };
    $scope.currentPlayer = $scope.pl1;
    $scope.rows = $scope.cols = [0, 1, 2];
    $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];


    $scope.isWinner = function () {
        $scope.fullCellCount = 0;
        $scope.diagonalSumm = 0;
        $scope.diagonalSummReflect = 0;
        $scope.countRowScore = [0, 0, 0];
        $scope.countColScore = [0, 0, 0];

        for (var row in $scope.board) {

            $scope.board[row].forEach(function (col, colNumber, colArr) {
                if (col === $scope.currentPlayer.simbol) {
                    $scope.countRowScore[row]++;
                    $scope.countColScore[colNumber]++;
                }

                if (col === $scope.currentPlayer.simbol && colNumber === +row) {
                    $scope.diagonalSumm++;
                }

                if (col === $scope.currentPlayer.simbol && colNumber === 2 - row) {
                    $scope.diagonalSummReflect++;
                }

                if (col !== null) {
                    $scope.fullCellCount++;
                }
            });

            //Array of all counted results
            $scope.countResults = [$scope.diagonalSumm, $scope.diagonalSummReflect];
            $scope.countResults = $scope.countResults.concat($scope.countColScore, $scope.countRowScore);

            $scope.allCountersCheck = $scope.countResults.some(function (counter) {
                return counter === 3;
            });

            if ($scope.allCountersCheck) {
                $scope.alertResult($scope.currentPlayer.simbol);
                return;
            }
        }

        if ($scope.fullCellCount === 9) {
            $scope.alertResult();
            return;
        }

        $scope.togglePlayer();
    };


    $scope.togglePlayer = function () {
        if ($scope.currentPlayer === $scope.pl1) {
            $scope.currentPlayer = $scope.pl2;
        } else {
            $scope.currentPlayer = $scope.pl1;
        }
    };


    $scope.alertResult = function (winner) {
        if (winner) {
            swal(winner.toUpperCase() + ' winner!');
            $timeout(function () {
                $scope.playSound($scope.audioEffects.winner);
            }, 350);
        } else {
            swal('draws');
            $timeout(function () {
                $scope.playSound($scope.audioEffects.draws);
            }, 350);
        }
        $scope.clearBoard();
    };


    $scope.clearBoard = function () {
        $scope.fullCellCount = 0;
        $scope.gameiInProcess = false;
        $scope.currentPlayer = $scope.pl1;
        for (var row in $scope.board) {
            for (var col in $scope.board[row]) {
                $scope.board[row][col] = null;
            }
        }
    };


    $scope.makeMute = function () {
        $scope.muteToggle = !$scope.muteToggle;
    };


    $scope.playSound = function (audioEffect) {
        $scope.currentAudio = new Audio(audioEffect);
        $scope.currentAudio.muted = $scope.muteToggle;
        $scope.currentAudio.play();
    };


    $scope.enableComputer = function() {
        $scope.computerEnable = !$scope.computerEnable;
    }
});