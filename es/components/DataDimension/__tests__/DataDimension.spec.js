"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DataDimension = require("../DataDimension");

var api = _interopRequireWildcard(require("../../../api/dimensions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe.only('DataDimension component ', function () {
  var props;
  var shallowDataDim;

  var dataDim = function dataDim() {
    if (!shallowDataDim) {
      shallowDataDim = (0, _enzyme.shallow)(_react.default.createElement(_DataDimension.DataDimension, props));
    }

    return shallowDataDim;
  };

  beforeEach(function () {
    props = {
      d2: {},
      selectedDimensions: [],
      displayNameProp: 'string',
      onSelect: jest.fn(),
      onDeselect: jest.fn(),
      onReorder: jest.fn()
    };
    shallowDataDim = undefined;
    api.apiFetchAlternatives = jest.fn().mockResolvedValue({
      dimensionItems: [{
        id: 'dimId1',
        name: 'dim Id1'
      }, {
        id: 'dimId2',
        name: 'dim Id2'
      }],
      nextPage: null
    });
  });
  describe('no groups found', function () {
    it('renders empty div', function (done) {
      api.apiFetchGroups = jest.fn().mockResolvedValue([]);
      var wrapper = dataDim();
      setTimeout(function () {
        expect(wrapper.find('div').first().length).toEqual(1);
        var dialogContent = wrapper.find('div').first().find(_DialogContent.default);
        expect(dialogContent.length).toBe(0);
        done();
      });
    });
  });
  describe('has groups', function () {
    beforeEach(function () {
      api.apiFetchGroups = jest.fn().mockResolvedValue([{
        id: 'rarity',
        name: 'Rarity'
      }, {
        id: 'rainbow',
        name: 'Rainbow Dash'
      }]);
    });
    it('renders a Fragment ', function (done) {
      var wrapper = dataDim();
      setTimeout(function () {
        expect(wrapper.find('Fragment').first().length).toEqual(1);
        done();
      });
    });
    it('renders a Fragment containing everything else', function (done) {
      var wrapper = dataDim();
      setTimeout(function () {
        var wrappingDiv = wrapper.find('Fragment').first();
        expect(wrappingDiv.children()).toEqual(wrapper.children());
        done();
      });
    });
  });
});