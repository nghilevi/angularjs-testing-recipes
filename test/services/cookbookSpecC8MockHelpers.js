/**
 * Created by nghi on 13.7.2015.
 */
describe('Chap 8: Service and Factory Testing with Mocks and Spies', function () {
  var emcees,url,httpMock,$q,$scope,defer,emcee;
  beforeEach(module('chapter8', function ($provide) {
    httpMock = jasmine.createSpyObj("$http",["get","post"]); //first/name parameter
    $provide.value("$http",httpMock)
  }));
  beforeEach(inject(function (_emcees_,_$q_,_$rootScope_) {
    emcees=_emcees_; //emcees = $injector.get('emcees');
    url = '/emcees/uk';
    $q = _$q_;
    $scope=_$rootScope_.$new(); //TODO why _$rootScope_ is OK too?
    defer = $q.defer();
    emcee = jasmine.mockData.emcee();
  }));

  describe('Using spies to test HTTP GET requests', function () {

    it('should make a GET request', function () {
      emcees.getUKEmcees()
      expect(httpMock.get).toHaveBeenCalled()
    });
    it('should make a POST request', function () {
      emcees.addUKEmcee("bla")
      expect(httpMock.post).toHaveBeenCalledWith(url,"bla")
    });
  })


  // Testing $q promise
  describe('Testing service data using mock helpers', function () {
    it('should store the response from the HTTP GET request', function () {

      httpMock.get.and.returnValue(defer.promise); //TODO HOW? and
      emcees.getUKEmcees2(1)
      defer.resolve(emcee)
      $scope.$digest()

      expect(emcees.emcee.name).toEqual(emcee.name);
    });
  })
  describe('Testing rejected $http promises', function () {
    it('should throw an error', function () {
      httpMock.get.and.returnValue(defer.promise);
      var errorMsg = 'Unauthorized';
      defer.reject(errorMsg);
      expect(function () {
        emcees.getUKEmcee(1);
        $scope.$digest(); //TODO ? ensure that all watchers are processed
      }).toThrowError(errorMsg);

    });

    it('should throw an error v2', function () {

      var errorMsg = 'Unauthorized';
      defer.reject(errorMsg);
      httpMock.get.and.returnValue(defer.promise);
      emcees.getUKEmcee2(1).catch(function (error) {
        expect(error).toEqual(errorMsg);
      });
      $scope.$digest();
    });
  })
})
