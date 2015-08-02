/**
 * Created by nghi on 2.8.2015.
 */
//angular.module('product',['c7Filters'])
angular.module('product',[])
  .filter('secondsToTime', function() {
    return function(value) {
      var seconds = Math.floor(value % 60).toString();
      var minutes = Math.floor(value / 60 % 60).toString();
      var hours = Math.floor(value / 60 / 60 % 24).toString();
      function pad(t) {
        if (t && t.length < 2) {
          return '0' + t;
        }
        return t;
      }
      return pad(hours > 0 ? hours.concat(':') : '').concat(pad(minutes), ':', pad(seconds));
    };
  })
  .directive('stopWatch', function() {
    return {
      require: 'ngModel',
      link: function(scope) {

        var timerInterval;
        var timerOffset;

        scope.timer = {
          current: 0,
          running: false
        };
        scope.start = function() {
          timerOffset = Date.now();
          timerInterval = setInterval(scope.update, 10);
        };
        scope.update = function() {
          scope.timer.current += scope.delta();
          scope.$digest();
        };
        scope.stop = function() {
          clearInterval(timerInterval);
        };
        scope.delta = function() {
          var now = Date.now();
          var delta = now - timerOffset;
          timerOffset = now;
          return delta;
        }

        // Listeners
        scope.onStartTimer = function() {
          scope.timer.running = !scope.timer.running;
          if (scope.timer.running) {
            scope.start();
          } else {
            scope.stop();
          }
        };
        scope.onResetTimer = function() {
          scope.timer.current = 0;
        };

      }
    };
  });