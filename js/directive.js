app.directive('ticTac', function() {
    return {
        restrict : "E",
        templateUrl : 'template/field.html',
        link     : function (scope, element, attrs) {
            scope.makeStep = function (row, col) {
                if (scope.currentPlayer === scope.pl1) {
                    scope.value = scope.pl1;
                    scope.currentPlayer = scope.pl2;
                } else {
                    scope.value = scope.pl2;
                    scope.currentPlayer = scope.pl1;
                }

                scope.setCell(row, col, scope.value);
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
        }
    }
});