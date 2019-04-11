"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DynamicDimension = require("../DynamicDimension");

describe('The Period Dimension component ', function () {
  var props;
  var shallowSelector;

  var dynamicSelector = function dynamicSelector() {
    if (!shallowSelector) {
      shallowSelector = (0, _enzyme.shallow)(_react.default.createElement(_DynamicDimension.DynamicDimension, props));
    }

    return shallowSelector;
  };

  beforeEach(function () {
    props = {
      d2: {},
      selectedItems: [],
      onSelect: jest.fn(),
      onDeselect: jest.fn(),
      onReorder: jest.fn(),
      dialogTitle: 'test',
      dialogId: '123abc'
    };
    shallowSelector = undefined;
  });
  it('renders a <Fragment> containing everything else', function () {
    var wrappingFragment = dynamicSelector().find('Fragment').first();
    expect(wrappingFragment.children()).toEqual(dynamicSelector().children());
  });
  it('renders a <DialogTitle /> and <DialogContent /> component', function () {
    var dynamicWrapper = dynamicSelector();
    expect(dynamicWrapper.find(_DialogTitle.default).length).toEqual(1);
    expect(dynamicWrapper.find(_DialogContent.default).length).toEqual(1);
  });
});