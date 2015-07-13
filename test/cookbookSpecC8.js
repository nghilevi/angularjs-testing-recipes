/**
 * Created by nghi on 13.7.2015.
 */
/**
 * Ref: http://odetocode.com/blogs/scott/archive/2013/06/11/angularjs-tests-with-an-http-mock.aspx
 */
describe('Chap 8: Service and Factory Testing with Mocks and Spies', function () {
  var res,resData = ['kamanchi-sly','el-eye','rola'];
  beforeEach(module('chapter8'));

  describe('Testing HTTP GET requests using $httpBackend', function () {
    var emcees,$httpBackend,url;
    beforeEach(inject(function ($injector) {
      emcees = $injector.get('emcees');
      $httpBackend = $injector.get('$httpBackend');
      url = '/emcees/uk';
    }));

    afterEach(function () { //y?
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('should make a GET request ver0', function () {
      $httpBackend.when('GET',url).respond({data:resData})//respond is mandatory for when
      $httpBackend.expectGET(url); //true/pass if url is the rite one that is expected
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

    it('should make a GET request ver1', function () {
      $httpBackend.when('GET',url).respond({data:resData})//respond is mandatory for when
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

    it('should make a GET request ver2', function () {
      $httpBackend.expect('GET',url).respond({data:resData}) //respond is optional for expect
      emcees.getUKEmcees();
      expect($httpBackend.flush).not.toThrow();
    });

    //Overload method
    it('should make a GET request ver0', function () {
      $httpBackend.whenGET(url).respond({data:resData})//respond is mandatory for when
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

  });

  describe('Testing HTTP POST requests using $httpBackend', function () {
    var emcees,$httpBackend,url,emcee = {'name': 'ids'};
    beforeEach(inject(function ($injector) {
      emcees = $injector.get('emcees');
      $httpBackend = $injector.get('$httpBackend');
      url = '/emcees/uk';
    }));
    it('should make a POST request', function () {
      //$httpBackend.whenPOST(url,emcee).respond(201, ''); //incorrect when later call emcees.addUKEmcee();
      $httpBackend.expectPOST(url,emcee).respond(201, '');

      emcees.addUKEmcee(emcee);
      $httpBackend.flush();
    });
  });
  
  describe('Using spies to test HTTP GET requests', function () {

    var emcees,httpMock,url,emcee = {'name': 'alkaline'};
    beforeEach(module(function ($provide) {
      httpMock = jasmine.createSpyObj("$http",["get","post"]); //first/name parameter
      //console.log("httpMock",httpMock)
      $provide.value("$http",httpMock)
    }))
    beforeEach(inject(function ($injector) {
      emcees = $injector.get('emcees');
      url = '/emcees/uk'
    }))
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

