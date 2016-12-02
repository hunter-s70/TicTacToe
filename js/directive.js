app.directive('ticTac', function() {
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
                if (scope.computerEnable) {
                    //code for computer step
                }
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