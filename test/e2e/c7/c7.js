/**
 * Created by nghi on 2.8.2015.
 */
/**
 * Created by nghi on 17.7.2015.
 */
xdescribe('', function () {
  describe('', function () {


    beforeEach(function () {
      browser.get('/c7.html');
    });

    it('should display the correct time format', function (){
      var button = element(by.partialButtonText('St'));
      var timeText = element(by.binding('timer.current'));
      button.click();
      button.click();
      expect(timeText.getText()).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
    });

  });
});