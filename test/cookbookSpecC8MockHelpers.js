/**
 * Created by nghi on 13.7.2015.
 */
describe('Chap 8: Service and Factory Testing with Mocks and Spies', function () {
  var $httpBackend,emcees,url,httpMock,res,resData = ['kamanchi-sly','el-eye','rola'];
  beforeEach(module('chapter8', function ($provide) {
    httpMock = jasmine.createSpyObj("$http",["get","post"]); //first/name parameter
    $provide.value("$http",httpMock)
  }));
  beforeEach(inject(function (_emcees_) {
    emcees=_emcees_; //emcees = $injector.get('emcees');
    url = '/emcees/uk';
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
})
