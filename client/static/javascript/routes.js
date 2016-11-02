var preview_module = angular.module('app', ['ngRoute', 'ngStorage'])
////////////////////////////////////////////////routes provider////////////////////////////////////////////////
preview_module.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
          templateUrl: 'partials/preview.html'
        })

        .otherwise({
          redirectTo: '/'
        });
    })
    // Initializing loading gif directive
    .directive('loading', function () {
          return {
            restrict: 'E',
            replace:true,
            template: '<div class="loading"><img class="loading" src="../images/loading.gif"/></div>',
            link: function (scope, element, attr) {
                  scope.$watch('loading', function (val) {
                      if (val)
                          $(element).show();
                      else
                          $(element).hide();
                  });
            }
          }
      })
