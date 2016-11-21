app.directive('ticTac', function() {
    return {
        restrict : "E",
        templateUrl : 'template/field.html',
        link     : function (scope, element, attrs) {

            scope.makeStep = function (row, col) {
                new Audio(scope.currentPlayer.audio).play();
                scope.setCell(row, col, scope.currentPlayer.simbol);
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