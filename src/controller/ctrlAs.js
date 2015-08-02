/**
 * Created by nghi on 2.8.2015.
 */
angular.module('ctrlAs', [])
  .controller('RoomCtrl', function() { // no need for $scope
    // scope is still useful for event

    this.openDoor = function () {
      alert('Kool G Rap');
    }
    this.buttonTitle="I'm a button"
  })