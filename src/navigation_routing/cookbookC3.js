angular.module('chapter3.ngRoute', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/emcees/:id', {
        controller: 'EmceesCtrl'
      })
      .when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('EmceesCtrl', ['$scope', '$routeParams','$route',function($scope, $routeParams,$route) {
    $scope.id = $routeParams.id;
  }]);

angular.module('chapter3.ui.router', ['ui.router'])
  .config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'home.html',
          controller:'HomeCtrl'
        })
        .state('emcees', {
          url: '/emcees/:id'
        });
      $urlRouterProvider
        .otherwise('/home');
    }]);