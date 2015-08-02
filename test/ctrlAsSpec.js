/**
 * Created by nghi on 2.8.2015.
 */
fdescribe('RoomCtrl', function () {
  var scope;
  beforeEach(module('ctrlAs'));
  beforeEach(inject(function ($rootScope,$controller) {
    scope = $rootScope.$new();
    $controller('RoomCtrl as room', {$scope: scope});
  }));

  it('should be the right buttonTitle', function () {
    expect(scope.room.buttonTitle).toEqual("I'm a button")
  });

})
