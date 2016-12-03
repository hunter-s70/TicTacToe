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

                        do {
                            row = scope.makeRandom(0, 2);
                            col = scope.makeRandom(0, 2);
                        } while (scope.board[row][col] !== null);

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