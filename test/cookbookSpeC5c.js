//Remember to instlal karma-ng-html2js-preprocessor to make it works

describe('Chap 5: Testing User Interaction and Directives', function () {
  var element, scope,$window;
  var breakers = [{
    name: 'China Doll'
  }, {
    name: 'Crazy Legs'
  }, {
    name: 'Frosty Freeze'
  }];

  function dispatchEvent(window,type) {
    var evt = document.createEvent('Event');
    evt.initEvent(type, true, true);
    window.dispatchEvent(evt);
  }

  beforeEach(module('chapter5','chapter5Templates'));
  //beforeEach(module('chapter5'));
  beforeEach(inject(function ($rootScope,_$window_) {
    scope = $rootScope.$new(); //why sometimes use scope = {}
    $window = _$window_;
  }));
  describe('Starting with testing directives', function () {
    var artist = 'Amara Por Dios';

    beforeEach(inject(function ($compile) {
      scope.artist = artist;
      element = angular.element('<writers></writers>'); //This wrapper exposes a range of useful jQuery methods to interactwith the element and its content
      $compile(element)(scope);
      scope.$digest(); //same effects $rootScope.$apply()
    }));

    it('shoudl display correct text in DOM', function () {
      expect(element.text()).toBe('Graffiti artist: ' + artist);
    });
  });

  describe("Setting up templateUrl", function () {
    var emcees = ['Roxanne Shante', 'Mc Lyte'];

    beforeEach(inject(function ($compile) {
      scope.emcees=emcees;
      element = angular.element('<emcees></emcees>');
      $compile(element)(scope);
      scope.$digest(); //faster than scope.$apply() http://stackoverflow.com/questions/18697745/apply-vs-digest-in-directive-testing
    }));

    it('should set the scope property to the correct initial value', function () {
      expect(element.find('h1').text()).toEqual(emcees[0]);
    });
  });

  //Accessing repeater content
  describe("Accessing repeater content", function () {

    beforeEach(inject(function ($compile) {
      scope.breakers = breakers;
      element = angular.element('<repeater></repeater>');
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should display the correct breaker name', inject(function($compile) {
      var list = element.find('li');
      expect(list.eq(0).text()).toEqual('China Doll');
    }));

    it('should display the correct breaker name', function($compile) {
      $compile(element)(scope);
    });
  })

  describe("Scope changes based on user input", function () {
    beforeEach(inject(function ($compile) {
      scope.breakers = breakers;
      element = angular.element('<breakers></breakers>');
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should update breakers list with defined input value', function () {
      function $input() {
        return element.children().eq(0); //target the <input name="input" value="" ng-keypress="onSubmit($event)" type="text">
      }
      $input().val('China Doll');
      scope.onSubmit({
        which:13,
        preventDefault: angular.noop,
        target:$input()[0]
      });
      expect(scope.breakers[0].name).toBe('China Doll');
    });
  })

  describe("Scope changes based on DOM events", function (){
    var width = 100;
    var height = 100;

    beforeEach(inject(function ($compile) {
      element = angular.element("<writers2></writers2>")
      $compile(element)(scope);
      scope.$digest();
    }));

    xit('should update scope with current window width on window resize', function () {
      //use spyOn with andCallFake to mock them providing your custom size.
      //TODO THIS DOES NOT WORK
      $window.resizeTo(width,height);
      console.log("before")
      console.log("$window.outerWidth",$window.outerWidth)
      console.log("$window.outerHeight",$window.outerHeight)
      //var resizeEvt = new Event("resize");
      //$window.dispatchEvent(resizeEvt);
      dispatchEvent($window,'resize')
      console.log("after");
      console.log("$window.outerWidth",$window.outerWidth)
      console.log("$window.outerHeight",$window.outerHeight)
      expect(scope.windowWidth).toEqual(width);
    });
  })

  describe("Class changes based on window properties", function () {
    var testClassName = 'popup';
    beforeEach(inject(function ($compile) {
      element = angular.element("<deejay></deejay>")
      $compile(element)(scope);
      scope.$digest();
    }));
    it('should have specific popup class if window name contains popup', function () {
      $window.name = testClassName;
      var divClass = element.find('div').attr('class');

      //TODO dont know why, just the way it is
      expect(scope.isPopup).toBeTruthy(); //important for it to work
      scope.$digest();

      expect(divClass).toContain(testClassName);
    });

  })
});


