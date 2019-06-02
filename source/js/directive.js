app.directive('ticTac', function($timeout) {
    return {
        restrict: "E",
        templateUrl: 'template/field.html',
        link: function (scope, element, attrs) {

            scope.makeStep = function (row, col) {
                if (scope.getCell(row, col)) return;
                scope.gameiInProcess = true;
                scope.setCell(row, col, scope.currentPlayer.simbol);
                scope.playSound(scope.currentPlayer.audio);
                scope.isWinner();
            };


            scope.viewStep = function (row, col) {
                scope.value = scope.getCell(row, col);
                return scope.value ? scope.value : '';
            };


            scope.getCell = function (row, col) {
                return scope.board[row][col];
            };


            scope.setCell = function (row, col, value) {
                if (!scope.board[row][col]) {
                    scope.board[row][col] = value;
                }
            };


            scope.makeStepComputer = function () {
                if (scope.computerEnable && scope.currentPlayer === scope.pl2) {
                    $timeout(function() {

                        do {
                            scope.stRow = scope.makeRandom(0, 2);
                            scope.stCol = scope.makeRandom(0, 2);
                        } while (scope.board[scope.stRow][scope.stCol] !== null);

                        scope.finedFreeCell(scope.board, scope.countResults);

                        if (scope.countComputerResults) {
                            var allComputerCountersCheck = scope.countComputerResults.some(function (counter) {
                                return counter === 2;
                            });

                            if (allComputerCountersCheck) {
                                scope.finedFreeCell(scope.board, scope.countComputerResults);
                            }
                        }

                        scope.makeStep(scope.stRow, scope.stCol);
                    }, 500);
                }
            };


            scope.finedFreeCell = function (board, fullCells) {
                fullCells.forEach(function (item, i) {

                    for (var n = 0; n < 3; n++) {
                        if (item !== 2) return;

                        //for diagonal
                        if (i === 0 && board[n][n] === null) {
                            scope.stRow = scope.stCol = n;
                        }

                        //for diagonal reflect
                        if (i === 1 && board[n][2 - n] === null) {
                            scope.stRow = n;
                            scope.stCol = 2 - n;
                        }

                        //for scope.stCols
                        if (i > 1 && i < 5 && board[n][i - 2] === null) {
                            scope.stRow = n;
                            scope.stCol = i - 2;
                        }

                        //for scope.stRows
                        if (i > 4 && board[i - 5][n] === null) {
                            scope.stRow = i - 5;
                            scope.stCol = n;
                        }
                    }
                });
            };


            scope.makeRandom = function (min, max) {
                var rand = min - 0.5 + Math.random() * (max - min + 1);
                return rand = Math.abs( Math.round(rand) );
            };


            //add watchers for board rows
            scope.board.forEach(function(row, i) {
                scope.$watchCollection(function () {
                    return scope.board[i];
                }, scope.makeStepComputer);
            });
        }
    }
});