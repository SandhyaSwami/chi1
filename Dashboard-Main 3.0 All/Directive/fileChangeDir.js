/**
 * Created by vaibhav_parkhi on 4/13/2017.
 */
location_macro.directive('fileChange', function() {
    return {
        restrict: 'A',
        scope: {
            handler: '&'
        },
        link: function (scope, element) {
            element.on('change', function (event) {
                scope.$apply(function(){
                    scope.handler({files: event.target.files});
                });
            });
        }
    };
})