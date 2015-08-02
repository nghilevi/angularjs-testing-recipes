/**
 * Created by nghi on 2.8.2015.
 */

angular.module('e2e',[])
  .factory('users', function($http) {
    return {
      getUsers: function() {
        return $http.get('http://jsonplaceholder.typicode.com/users');
      }
    };
  })
  .controller('HomeCtrl',function($scope, users) {
    $scope.onLoadUsers = function() {
      users.getUsers().then(function(response) {
        $scope.users = response.data;
      });
    };
  });