
//Remember to install angular route
//Neu bi loi minError co nghia la dependency co van de. check lai path cua karma
describe('Chap 3: How to test Navigation & Routing', function () {
  describe('ngRoute', function () {
    beforeEach(module('chapter3.ngRoute'));
    beforeEach(inject(function ($templateCache) {
      $templateCache.put('home.html', 'Some template content');
    }));

    it('route controller should be mapped to HomeCtrl',inject(function ($rootScope, $location, $route) {
      //$location.path('/home');
      //$rootScope.$digest - not working
      //$rootScope.$apply(); //ensure that changes are propagated
      $rootScope.$apply(function () { //safer as it is passed in a try-catch block
        $location.path('/home');
      });
      expect($route.current.controller).toEqual('HomeCtrl')
    }));
    it('route controller should be mapped to HomeCtrl v2',inject(function ($rootScope, $location, $route) {
      $location.path('/home');
      $rootScope.$apply(); //same as $digest() ensure that changes are propagated
      expect($route.current.controller).toEqual('HomeCtrl')
    }));
    it('route templateUrl should be home',inject(function ($location,$rootScope,$route) {
      $location.path('/home');
      $rootScope.$apply();
      expect($route.current.templateUrl).toEqual('home.html');
    }));

    it('should assign routeParams to scope',inject(function ($rootScope, $controller) {
      var scope = $rootScope.$new();
      $controller('EmceesCtrl',{
        $scope:scope,
        $routeParams:{
          id:'1'
        }
      });
      expect(scope.id).toEqual('1');
    }))

  });

  describe('ui.router', function () {

    var rootScope,state;
    beforeEach(module('chapter3.ui.router'));
    beforeEach(inject(function ($templateCache,$rootScope,$state) {
      $templateCache.put('home.html', '');
      rootScope = $rootScope.$new()
      state=$state;
    }))

    describe("Basic route and state testing with ui-router", function () {

      it('default state should be home',inject(function ($rootScope,$state) {
        $rootScope.$apply();
        expect($state.current.name).toEqual("home");
      }))

      it('state templateUrl should be home.html', inject(function ($rootScope, $state) {
        //console.log("BEFORE---------");
        //console.log("$rootScope",$rootScope);
        //console.log("$state.current.templateUrl",$state.current.templateUrl)
        $rootScope.$apply() //Tell me why?
        //console.log("AFTER---------");
        //console.log("$rootScope",$rootScope);
        //console.log("$state.current.templateUrl",$state.current.templateUrl)
        expect($state.current.templateUrl).toEqual('home.html');
      }))

      it('state controller should be HomeCtrl',inject(function ($state,$rootScope) {
        $rootScope.$apply()
        expect($state.current.controller).toEqual('HomeCtrl');
      }));
    })
    describe("Testing the transitioning state with ui-router", function () {

      it('default state should be home', function (){
        rootScope.$apply()
        expect(state.current.name).toEqual('home')
      })

      it('should transition to emcees state', function () {
        state.go('emcees')
        rootScope.$apply()
        expect(state.current.name).toEqual('emcees')
      })
    })
    describe("Testing URL parameters with ui-router", function (){

      it('should transition to emcees state passing the correct id', function () {
        state.go('emcees',{id:1})
        rootScope.$apply()
        expect(state.params.id).toEqual('1');
      })
    })
    describe("Testing page loading using Protractor", function () {
      pending()
      beforeEach(function () {
        browser.get('http://0.0.0.0:8000/');
        it('should default to home page', function () {
          expect(browser.getLocationAbsUrl()).toContain('/home');
        });
      });
    })

  })
})



