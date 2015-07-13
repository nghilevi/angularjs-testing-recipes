/**
 * Created by nghi on 13.7.2015.
 */
jasmine.mockData = (typeof jasmine.mockData === 'undefined') ? {} : jasmine.mockData;

jasmine.mockData.emcee = function() {
  return {
    "name": "Spye",
    "crew": "Undivided Attention",
    "label": "Hairy Parents"
  };
};