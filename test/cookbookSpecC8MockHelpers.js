/**
 * Created by nghi on 13.7.2015.
 */
describe('Chap 8: Service and Factory Testing with Mocks and Spies', function () {
  var emcees,url,httpMock,$q,$scope;
  beforeEach(module('chapter8', function ($provide) {
    httpMock = jasmine.createSpyObj("$http",["get","post"]); //first/name parameter
    $provide.value("$http",httpMock)
  }));
  beforeEach(inject(function (_emcees_,_$q_,_$rootScope_) {
    emcees=_emcees_; //emcees = $injector.get('emcees');
    url = '/emcees/uk';
    $q = _$q_;
    $scope=_$rootScope_
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

  // TODO MAGIC TO ME
  describe('Testing service data using mock helpers', function () {
    it('should store the response from the HTTP GET request', function () {
      var defer = $q.defer();
      var emcee = jasmine.mockData.emcee();
      console.log("defer.promise before resolve",defer.promise)
      defer.resolve(emcee)
      console.log("defer.promise after resolve",defer.promise)
      httpMock.get.and.returnValue(defer.promise); //HOW? and
      emcees.getUKEmcees2('1')
      $scope.$digest()
      expect(emcees.emcee.name).toEqual(emcee.name);
    });
  })
})
