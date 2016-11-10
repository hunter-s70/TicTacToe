app.directive('ticTac', function() {
    return {
        restrict : "E",
        templateUrl : 'template/field.html',
        link     : function (scope, element, attrs) {
            scope.makeStep = function () {
                console.log(attrs);
            };
        }
    }
});