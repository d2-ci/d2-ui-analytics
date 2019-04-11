"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _PeriodDimension = require("../PeriodDimension");

jest.mock('@dhis2/d2-ui-period-selector-dialog', function () {
  return {
    PeriodSelector: 'mockPeriodSelector'
  };
});
describe('The Period Dimension component', function () {
  var props = {
    selectedPeriods: [],
    onSelect: jest.fn(),
    onDeselect: jest.fn(),
    onReorder: jest.fn()
    /*
    ui: {
        itemsByDimension: {
            [peId]: [],
        },
    },
    metadata: {},
    addMetadata: jest.fn(),
    addUiItems: jest.fn(),
    removeUiItems: jest.fn(),
    setUiItems: jest.fn(),
    context: { d2: {} },
    */

  };
  it('renders correctly', function () {
    var tree = _reactTestRenderer.default.create(_react.default.createElement(_PeriodDimension.PeriodDimension, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});