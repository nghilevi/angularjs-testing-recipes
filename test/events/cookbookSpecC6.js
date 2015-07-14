describe('Chap 6: Using Spies to Test Events', function () {
  var scope,homeCtrl,element;
  var wuTangClan = ['RZA', 'GZA', 'Method Man', 'Raekwon', 'Ghostface Killah', 'Inspectah Deck', 'U-God', 'MastaKilla', 'Cappadonna', 'ODB'];

  beforeEach(module('chapter6'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new()
    //scope = {} //fail as later need $on
    homeCtrl = $controller('HomeCtrl', { //why do this
      $scope: scope
    });
  }));

  describe('Testing event dispatches', function () {

    beforeEach(inject(function ($rootScope, $controller) {
      spyOn(scope,"$broadcast");
    }));

    //it('should call $broadcast', function () {
    //  homeCtrl.showWuEmcee();
    //  expect(scope.$broadcast).toHaveBeenCalled();
    //});

    it('should call $broadcast', function () {
      scope.showWuEmcee();
      expect(scope.$broadcast).toHaveBeenCalled();
    });

    it('should call $broadcast with correct event name and emcee', function () {
      scope.showWuEmcee(wuTangClan[0]);
      expect(scope.$broadcast).toHaveBeenCalledWith('showWuEmcee',wuTangClan[0]);
    });

    it('should call $broadcast with specific argument', function () {
      scope.showWuEmcee(wuTangClan[0]);
      expect(scope.$broadcast.calls.argsFor(0)).toContain(wuTangClan[0]);
    });
    //would that be covered
  });

  describe('Testing the handling of dispatched events', function () {
    it('should assign correct emcee to scope', function () {
      scope.showWuEmcee(wuTangClan[0]);
      expect(scope.wuWho).toEqual(wuTangClan[0]);
      scope.showWuEmcee();
      expect(scope.wuWho).toEqual(scope.UNKNOWN_NAME);
    });
  })

  describe('Testing the handling of external events', function () {
    beforeEach(inject(function ($compile) {
      element = angular.element('<div wu-tang></div>')
      $compile(element)(scope)
      scope.$digest(); //why
    }))
    it('should respond to an event and update scope', function () {
      dispatchEvent(new CustomEvent('oncanplay'));
      expect(scope.canPlay).toBeTruthy()
    });
  })

  describe('Testing the handling of callbacks', function () {
    beforeEach(inject(function ($compile) {
      element = angular.element('<div jwplayer></div>')
      $compile(element)(scope)
      scope.$digest();
    }))
    it('should update scope within callback', function () {
      scope.readyHandler();
      expect(scope.ready).toBeTruthy()
    });
  })
})


