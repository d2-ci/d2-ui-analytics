"use strict";

var _dimensions = require("../dimensions");

var mockD2;
var mockGetFn;
var dimensionProps;

var checkMatches = function checkMatches(url, matches) {
  matches.forEach(function (match) {
    if (match.not) {
      expect(url).not.toMatch(match.regex);
    } else {
      expect(url).toMatch(match.regex);
    }
  });
};

var asyncCheckMatches = function asyncCheckMatches(matches, done) {
  setTimeout(function () {
    expect(mockGetFn).toHaveBeenCalledTimes(1);
    var url = mockGetFn.mock.calls[0][0];
    checkMatches(url, matches);
    done();
  });
};

describe('api: dimensions', function () {
  beforeEach(function () {
    mockGetFn = jest.fn().mockResolvedValue({
      pager: {}
    });
    mockD2 = {
      Api: {
        getApi: function getApi() {
          return {
            get: mockGetFn
          };
        }
      }
    };
  });
  describe('apiFetchDimensions', function () {
    it('has correct entity and name property', function (done) {
      (0, _dimensions.apiFetchDimensions)(mockD2, 'entireName');
      asyncCheckMatches([{
        regex: /\/dimensions\?/
      }, {
        regex: /entireName~rename\(name\)/
      }], done);
    });
  });
  describe('apiFetchGroups', function () {
    beforeEach(function () {
      dimensionProps = {
        groupDetail: '',
        nameProp: 'entireName',
        groupId: 'ALL',
        page: 1
      };
    });
    it('has correct endpoint, name prop, and page value for indicators', function (done) {
      (0, _dimensions.apiFetchGroups)(mockD2, 'indicators', 'entireName');
      var matches = [{
        regex: /\/indicatorGroups\?/
      }, {
        regex: /displayName~rename\(name\)/
      }, {
        regex: /paging=false/
      }];
      asyncCheckMatches(matches, done);
    });
    it('has correct name prop for dataElements', function (done) {
      (0, _dimensions.apiFetchGroups)(mockD2, 'dataElements', 'entireName');
      var matches = [{
        regex: /\/dataElementGroups\?/
      }, {
        regex: /entireName~rename\(name\)/
      }];
      asyncCheckMatches(matches, done);
    });
    it('does not make an api request for dataSets', function (done) {
      (0, _dimensions.apiFetchGroups)(mockD2, 'dataSets');
      setTimeout(function () {
        expect(mockGetFn).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('apiFetchAlternatives', function () {
    beforeEach(function () {
      dimensionProps = {
        d2: mockD2,
        groupDetail: '',
        nameProp: 'entireName',
        groupId: 'ALL',
        page: 1
      };
    });
    describe('indicators url', function () {
      beforeEach(function () {
        dimensionProps.dataType = 'indicators';
      });
      it('has correct name, filter and page value', function (done) {
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        var matches = [{
          regex: /\/indicators\?/
        }, {
          regex: /entireName~rename\(name\)/
        }, {
          regex: /filter/,
          not: true
        }, {
          regex: /page=1/
        }];
        asyncCheckMatches(matches, done);
      });
      it('has correct filter text value', function (done) {
        dimensionProps.filterText = 'rarity';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        asyncCheckMatches([{
          regex: /filter=entireName:ilike:rarity/
        }], done);
      });
      it('has correct filter based on group Id', function (done) {
        dimensionProps.groupId = 'rarity';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        asyncCheckMatches([{
          regex: /filter=indicatorGroups\.id:eq:rarity/
        }], done);
      });
    });
    describe('dataElements url', function () {
      beforeEach(function () {
        dimensionProps.dataType = 'dataElements';
      });
      describe('totals', function () {
        it('has correct fields, filter, and page', function (done) {
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          var matches = [{
            regex: /\/dataElements\?/
          }, {
            regex: /fields=id,entireName~rename\(name\)/
          }, {
            regex: /filter=domainType:eq:AGGREGATE/
          }, {
            regex: /filter=dataElementGroups/,
            not: true
          }, {
            regex: /page=1/
          }];
          asyncCheckMatches(matches, done);
        });
        it('has correct filter text value', function (done) {
          dimensionProps.filterText = 'rarity';
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          asyncCheckMatches([{
            regex: /filter=entireName:ilike:rarity/
          }], done);
        });
        it('has correct filter based on group Id', function (done) {
          dimensionProps.groupId = 'rarity';
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          asyncCheckMatches([{
            regex: /filter=dataElementGroups\.id:eq:rarity/
          }], done);
        });
      });
      describe('details', function () {
        beforeEach(function () {
          dimensionProps.groupDetail = 'detail';
        });
        it('has correct fields, filter, and page', function (done) {
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          var matches = [{
            regex: /\/dataElementOperands\?/
          }, {
            regex: /fields=id,entireName~rename\(name\)/
          }, {
            regex: /filter/,
            not: true
          }, {
            regex: /page=1/
          }];
          asyncCheckMatches(matches, done);
        });
        it('has correct filter text value', function (done) {
          dimensionProps.filterText = 'rarity';
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          asyncCheckMatches([{
            regex: /filter=entireName:ilike:rarity/
          }], done);
        });
        it('has correct filter based on group Id', function (done) {
          dimensionProps.groupId = 'rarity';
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          asyncCheckMatches([{
            regex: /filter=dataElement\.dataElementGroups\.id:eq:rarity/
          }], done);
        });
        it('has correct url params for filterText and group Id', function (done) {
          dimensionProps.filterText = 'rarity';
          dimensionProps.groupId = 'rainbow';
          (0, _dimensions.apiFetchAlternatives)(dimensionProps);
          asyncCheckMatches([{
            regex: /filter=entireName:ilike:rarity/
          }, {
            regex: /filter=dataElement\.dataElementGroups\.id:eq:rainbow/
          }], done);
        });
      });
    });
    describe('dataSets url', function () {
      beforeEach(function () {
        dimensionProps.dataType = 'dataSets';
      });
      it('has correct fields, filter, and page', function (done) {
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        var matches = [{
          regex: /\/dataSets\?/
        }, {
          regex: /entireName~rename\(name\)/
        }, {
          regex: /filter/,
          not: true
        }, {
          regex: /page=1/
        }];
        asyncCheckMatches(matches, done);
      });
      it('has correct filter text value', function (done) {
        dimensionProps.filterText = 'rarity';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        asyncCheckMatches([{
          regex: /filter=entireName:ilike:rarity/
        }], done);
      });
    });
    describe('eventDataItems', function () {
      beforeEach(function () {
        dimensionProps.dataType = 'eventDataItems';
        mockGetFn = jest.fn().mockImplementation(function (url) {
          if (url.includes('programDataElements')) {
            return Promise.resolve({
              programDataElements: [{
                id: 'cc',
                name: 'Chocolate cake',
                valueType: 'NUMBER'
              }, {
                id: 'em',
                name: 'English muffin',
                valueType: 'TEXT'
              }],
              pager: {}
            });
          } else if (url.includes('programs/')) {
            return Promise.resolve({
              name: 'Veggies',
              programTrackedEntityAttributes: [{
                trackedEntityAttribute: {
                  id: 'spin',
                  name: 'Spinach',
                  valueType: 'TEXT'
                }
              }, {
                trackedEntityAttribute: {
                  id: 'broc',
                  name: 'Broccoli',
                  valueType: 'NUMBER'
                }
              }]
            });
          }

          return Promise.resolve({
            pager: {}
          });
        });
      });
      it('returns the correct dimension items', function (done) {
        dimensionProps.groupId = 'rainbowdash';
        var expectedResult = {
          dimensionItems: [{
            id: 'cc',
            name: 'Chocolate cake',
            valueType: 'NUMBER'
          }, {
            id: 'rainbowdash.broc',
            name: 'Veggies Broccoli',
            valueType: 'NUMBER'
          }],
          nextPage: null
        };
        setTimeout(function () {
          expect((0, _dimensions.apiFetchAlternatives)(dimensionProps)).resolves.toEqual(expectedResult);
          done();
        });
      });
      it('has correct fields, filter, and page (data elements) in request url', function (done) {
        dimensionProps.groupId = 'rainbowdash';
        var matches = [{
          regex: /\/programDataElements\?/
        }, {
          regex: /entireName~rename\(name\)/
        }, {
          regex: /filter/,
          not: true
        }, {
          regex: /page=1/
        }, {
          regex: /program=rainbowdash/
        }];
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        setTimeout(function () {
          expect(mockGetFn).toHaveBeenCalledTimes(2);
          var url = mockGetFn.mock.calls[0][0];
          checkMatches(url, matches);
          done();
        });
      });
      it('has correct filter text value in request url', function (done) {
        dimensionProps.filterText = 'rarity';
        var matches = [{
          regex: /filter=entireName:ilike:rarity/
        }];
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        setTimeout(function () {
          expect(mockGetFn).toHaveBeenCalledTimes(2);
          var url = mockGetFn.mock.calls[0][0];
          checkMatches(url, matches);
          done();
        });
      });
      it('has correct fields and filter (attributes) in request url', function (done) {
        dimensionProps.groupId = 'rainbowdash';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        var matches = [{
          regex: /\/programs\/rainbowdash/
        }, {
          regex: /entireName~rename\(name\)/
        }, {
          regex: /filter/,
          not: true
        }];
        setTimeout(function () {
          expect(mockGetFn).toHaveBeenCalledTimes(2);
          var url = mockGetFn.mock.calls[1][0];
          checkMatches(url, matches);
          done();
        });
      });
    });
    describe('programIndicators url', function () {
      beforeEach(function () {
        dimensionProps.dataType = 'programIndicators';
      });
      it('has correct fields, filter, and page', function (done) {
        dimensionProps.groupId = 'rainbowdash';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        var matches = [{
          regex: /\/programIndicators\?/
        }, {
          regex: /entireName~rename\(name\)/
        }, {
          regex: /page=1/
        }, {
          regex: /filter=program.id:eq:rainbowdash/
        }];
        asyncCheckMatches(matches, done);
      });
      it('has correct filter text value', function (done) {
        dimensionProps.filterText = 'rarity';
        (0, _dimensions.apiFetchAlternatives)(dimensionProps);
        asyncCheckMatches([{
          regex: /filter=entireName:ilike:rarity/
        }], done);
      });
    });
  });
});