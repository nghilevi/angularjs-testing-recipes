describe('Chap 7: Testing Filters', function () {

  beforeEach(module('chapter7'));

  describe('Testing a filter that formats a number as text', function () {
    var decimalAdjustFilter;
    beforeEach(inject(function ($filter) {
      decimalAdjustFilter = $filter('decimalAdjust');
    }));

    it('should adjust decimal correctly using round', function () {
      expect(decimalAdjustFilter('round', 5e2, -1)).toBe(500);
    });
  });


  describe('Testing a filter that formats seconds to a time string', function () {
    it('should return a time formatted string (seconds)',inject(function (secondsToTimeFilter) {
      expect(secondsToTimeFilter(1)).toBe('00:01');
      expect(secondsToTimeFilter(103)).toBe('01:43')
      expect(secondsToTimeFilter(9504)).toBe('2:38:24');
    }));
  });

})

