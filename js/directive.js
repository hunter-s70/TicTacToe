app.directive('ticTac', function($timeout) {
    return {
        restrict : "E",
        templateUrl : 'template/field.html',
        link     : function (scope, element, attrs) {

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
                        var row, col;

                        console.log(scope.countResults);

                        scope.allCountersCheck = scope.countResults.some(function (counter) {
                            return counter === 2;
                        });

                        do {
                            row = scope.makeRandom(0, 2);
                            col = scope.makeRandom(0, 2);
                        } while (scope.board[row][col] !== null);

                        if (scope.allCountersCheck) {
                            scope.countResults.forEach(function (item, i) {
                                //for rows
                                if (item === 2 && i > 4) {
                                    do {
                                        row = i - 5;
                                        col = scope.makeRandom(0, 2);
                                    } while (scope.board[row][col] === scope.pl1.simbol)
                                }

                                //for cols
                                if (item === 2 && i > 1 && i < 5) {
                                    do {
                                        row = scope.makeRandom(0, 2);
                                        col = i - 2;
                                    } while (scope.board[row][col] === scope.pl1.simbol)
                                }

                                //for diagonal
                                if (item === 2 && i === 0) {
                                    do {
                                        row = col = scope.makeRandom(0, 2);
                                    } while (scope.board[row][col] === scope.pl1.simbol)
                                }

                                //for diagonal reflect
                                if (item === 2 && i === 1) {
                                    do {
                                        row = scope.makeRandom(0, 2);
                                        col = 2 - row;
                                    } while (scope.board[row][col] === scope.pl1.simbol)
                                }
                            })
                        }

                        scope.makeStep(row, col);
                    }, 500);
                }
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