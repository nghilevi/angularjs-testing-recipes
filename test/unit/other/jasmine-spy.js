/**
 * Created by nghi on 16.7.2015.
 */

describe("jasmine play",function(){
  describe("spyOn", function() {
    var	objectUnderTest;
    beforeEach(function () {
      objectUnderTest	=	{
        someFunction	:	function(){return	'stub	me!';}
      };
    })

    it("should be called twice",function(){
      spyOn(objectUnderTest,'someFunction');
      objectUnderTest.someFunction();
      objectUnderTest.someFunction();
      expect(objectUnderTest.someFunction.calls.count()).toEqual(2);
    });
  });
  describe("tracking properties", function() {
    var foo, bar = null;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };
      spyOn(foo, 'setBar');
    });

    it("calls.allArgs(): tracks the arguments of all calls", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.allArgs()).toEqual([[123],[456,"baz"]])
    });

    it("calls.all(): can provide the context and arguments to all calls", function() {
      foo.setBar(1);
      foo.setBar(2);
      expect(foo.setBar.calls.all()).toEqual(
        [
          {
            object: foo,
            args: [1],
            returnValue: undefined
          },
          {
            object: foo,
            args: [2],
            returnValue: undefined
          }
        ]
      );
    });

    it("calls.mostRecent(): has a shortcut to the most recent call", function() {
      foo.setBar(1);
      foo.setBar(2);
      expect(foo.setBar.calls.mostRecent()).toEqual(
          {
            object: foo,
            args: [2],
            returnValue: undefined
          }
      );
    });

    it("calls.first(): has a shortcut to the first call", function() {
      foo.setBar(1);
      foo.setBar(2);
      expect(foo.setBar.calls.first()).toEqual(
        {
          object: foo,
          args: [1],
          returnValue: undefined
        }
      );
    });

    it("tracks the context", function() {
      var spy = jasmine.createSpy('spy');
      var baz = {
        fn: spy
      };
      var quux = {
        fn: spy
      };
      baz.fn(123);
      quux.fn(456);

      expect(spy.calls.first().object).toBe(baz);
      expect(spy.calls.mostRecent().object).toBe(quux);
    });

    it("can be reset", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");

      expect(foo.setBar.calls.any()).toBe(true);

      foo.setBar.calls.reset();

      expect(foo.setBar.calls.any()).toBe(false);
    });

  });
  describe("createSpy", function () {
    var whatAmI;

    beforeEach(function() {
      whatAmI = jasmine.createSpy('whatAmI');
      whatAmI("I", "am", "a", "spy");
      var nghi = function () {
        return "nghi"
      }

      console.log("nghi",nghi)
      console.log("nghi.and",nghi.and)
      console.dir("whatAmI",whatAmI)
    });

    it("is named, which helps in error reporting", function () {
      console.log("whatAmI.and",whatAmI.and)
      expect(whatAmI.and.identity()).toBe("whatAmI") //TODO how can it called
      expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    })

  })
  describe("createSpyObj", function () {
    var tape;
    beforeEach(function() {
      tape = jasmine.createSpyObj('tape',['play','pause','stop','rewind']);
      tape.play()
      tape.pause();
      tape.rewind(0);
    })
    it("creates spies for each requested function", function() {
      console.log("tape",tape)
      for(key in tape)
        expect(key).toBeDefined();
      //expect(tape.pause).toBeDefined();
      //expect(tape.stop).toBeDefined();
      //expect(tape.rewind).toBeDefined();
    });
  });

  describe("jasmine.any", function() {
    it("matches any value", function() {
      expect({}).toEqual(jasmine.any(Object));
      expect(12).toEqual(jasmine.any(Number));
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var foo = jasmine.createSpy('foo');
        foo(12, function() {
          return true;
        });

        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
      });
    });
  });

  describe("jasmine.objectContaining", function() {
    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var callback = jasmine.createSpy('callback');
        callback({bar: "baz"});
        expect(callback.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({bar: "baz"}))
        expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({bar: "baz"}));
      })
    });
  });

  describe("Manually ticking the Jasmine Clock", function() {
    var timerCallback;
    beforeEach(function () {
      timerCallback = jasmine.createSpy("timerCallback");
      jasmine.clock().install()
    });
    afterEach(function () {
      jasmine.clock().uninstall()
    });
    it('causes a TIMEOUT to be called async', function () {
      setTimeout(function () {
        timerCallback()
      },100);
      expect(timerCallback).not.toHaveBeenCalled()
      jasmine.clock().tick(101)
      expect(timerCallback).toHaveBeenCalled()
    });
    it('causes an INTERVAL to be called synchronous', function () {
      setInterval(function() {
        timerCallback();
      }, 100);

      expect(timerCallback).not.toHaveBeenCalled();

      jasmine.clock().tick(101);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(2);

    });
  })



  describe("Asynchronous specs", function() {
    var value;
    beforeEach(function(nguyen) {
      setTimeout(function() {
        value = 0;
        nguyen(); //will not start until the done function is called
      }, 1);
    });
    it("should support async execution of test preparation and expectations", function(nghi) {
      value++;
      expect(value).toBeGreaterThan(0);
      nghi()(); //should be called when async work is complete. this spec will not complete until its done is called
    });
  });

  describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 2000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });

  });