angular.module('chapter5', [])
  .directive('writers', function() {
    return {
      restrict: 'E',
      link: function(scope, element) {
        element.text('Graffiti artist: ' + scope.artist);
      }
    };
  })
  .directive('emcees', function() {
    return {
      restrict: 'E',
      templateUrl: 'template.html',
      link: function(scope, element) {
        scope.emcee = scope.emcees[0];
      }
    };
  })
  .directive('repeater', function() {
    return {
      restrict: 'E',
      template: "<ul>\n  <li ng-repeat='b in breakers'>{{b.name}}</li>\n</ul>\n"
    };
  })
  .directive('breakers', function() {
    return {
      restrict: 'E',
      template: '<input type="text" name="input" value="" ng-keypress="onSubmit($event)">\n<ul>\n  <li ng-repeat="breaker in breakers">{{breaker.name}}</li>\n</ul>',
      link: function(scope) {
        scope.onSubmit = function(event) {
          if (event.which === 13) {
            var input = event.target;
            scope.breakers.push({name:input.value});
          }
        }
      }
    };
  })
  .directive('writers2', function($window) {
      return {
        restrict: 'E',
        link: function(scope, element) {
          function onResize(e) {

            scope.windowWidth = $window.outerWidth;
          }
          angular.element($window).bind('resize',onResize);
        }
      };
    })
  .directive('deejay', function($window) {
    return {
      restrict: 'E',
      template: '<div class="deejay-booth" ng-class="{popup: isPopup === true}"></div>',
      link: function(scope) {
        scope.isPopup = $window.name.search(/popup/) >= 0;
      }
    };
  })