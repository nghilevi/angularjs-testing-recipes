/**
 * Created by nghi on 2.8.2015.
 */
describe('C8', function () {
  beforeEach(function () {
    browser.get('/c8.html');
  });

  it('should do display users and hide the load users button on success', function (){
    //var button = element(by.partialButtonText('Lo'));
    var button = element(by.buttonText('Load Users'));
    button.click();

    var firstUserName = element(by.repeater('user in users').row(0).column('user.name'));
    expect(firstUserName).toBeDefined();
    expect(button.isDisplayed()).toBeFalsy();
  });

});