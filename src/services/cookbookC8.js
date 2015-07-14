/**
 * Created by nghi on 13.7.2015.
 */
angular.module('chapter8', [])
  .service('emcees', function($http) {
    return {
      addUKEmcee: function(emcee) {
        return $http.post('/emcees/uk', emcee);
      },
      emcee:{},
      getUKEmcees: function() {
        return $http.get('/emcees/uk');
      },
      getUKEmcees2: function(id) {
        var that = this;
        return $http.get('/emcees/uk'+id).then(function (response) {
          that.emcee = response;
        });
      },
      getUKEmcee: function(id) {
        return $http.get('/emcees/uk/' + id)
          .catch(function(error) {
            throw Error(error);
          });
      },
      getUKEmcee2: function(id) {
        return $http.get('/emcees/uk/' + id)
      }
    };
  })
  .constant('MESSAGES', {
    'errors': {
      'ukemcees': 'There was an error loading emcees based in good old blighty.'
    }
  });
