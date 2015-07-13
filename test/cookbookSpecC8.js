/**
 * Created by nghi on 13.7.2015.
 */
/**
 * Ref: http://odetocode.com/blogs/scott/archive/2013/06/11/angularjs-tests-with-an-http-mock.aspx
 */
describe('Chap 8: Service and Factory Testing with Mocks and Spies', function () {
  var $httpBackend,emcees,url,resData;

  beforeEach(module('chapter8'));
  beforeEach(inject(function (_emcees_) {
    resData = jasmine.mockData.emcee() //only works here inside the mechanism -> TODO WHY?
    emcees=_emcees_; //emcees = $injector.get('emcees');
    url = '/emcees/uk';
  }));

  describe('Testing HTTP GET requests using $httpBackend', function () {
    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend =_$httpBackend_;
    }));

    afterEach(function () { //y?
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })

    it('should make a GET request ver0', function () {
      $httpBackend.when('GET',url).respond(resData)//respond is mandatory for when
      $httpBackend.expectGET(url); //true/pass if url is the rite one that is expected
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

    it('should make a GET request ver1', function () {
      $httpBackend.when('GET',url).respond(resData)//respond is mandatory for when
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

    it('should make a GET request ver2', function () {
      $httpBackend.expect('GET',url).respond(resData) //respond is optional for expect
      emcees.getUKEmcees();
      expect($httpBackend.flush).not.toThrow();
    });

    //Overload method
    it('should make a GET request ver0', function () {
      $httpBackend.whenGET(url).respond(resData)//respond is mandatory for when
      emcees.getUKEmcees();
      $httpBackend.flush();
    });

  });

  describe('Testing HTTP POST requests using $httpBackend', function () {
    var emcee = {'name': 'ids'};
    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend =_$httpBackend_;
    }));
    it('should make a POST request', function () {
      //$httpBackend.whenPOST(url,emcee).respond(201, ''); //incorrect when later call emcees.addUKEmcee();
      $httpBackend.expectPOST(url,emcee).respond(201, '');
      emcees.addUKEmcee(emcee);
      $httpBackend.flush();
    });
  });

  describe("Testing constants", function () {
    var MESSAGES;
    beforeEach(inject(function (_MESSAGES_) {
      MESSAGES = _MESSAGES_;
    }));
    it('should have a MESSAGES constant object', function(){
      expect(MESSAGES).toBeDefined();
    });

    it('should have correct errors.http.ukemcees constant',function() {
      var message = 'There was an error loading emcees based in good old blighty.';
      expect(MESSAGES.errors.ukemcees).toBe(message);
    });
  })
})

