/**
 * Created by nghi on 13.7.2015.
 */
angular.module('chapter8', [])
  .service('emcees', function($http) {
    return {
      getUKEmcees: function() {
        return $http.get('/emcees/uk');
      },
      addUKEmcee: function(emcee) {
        return $http.post('/emcees/uk', emcee);
      },
      emcee:{},
      getUKEmcees2: function(id) {
        var that = this;
        return $http.get('/emcees/uk'+id).then(function (response) {
          that.emcee = response;
        });
      },
    };
  });

