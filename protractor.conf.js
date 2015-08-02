/**
 * Created by nghi on 7.7.2015.
 */
//exports.config = {
//  seleniumAddress: 'http://localhost:4444/wd/hub',
//  specs: ['test/e2e/**/*.js'],
//  jasmineNodeOpts: {
//    showColors: true,
//    defaultTimeoutInterval: 3000
//  }
//};

exports.config = {
  capabilities: {
    'browserName': 'firefox'
  },
  specs: ['test/e2e/**/*.js'],
  baseUrl:	'http://localhost:8081/',
};