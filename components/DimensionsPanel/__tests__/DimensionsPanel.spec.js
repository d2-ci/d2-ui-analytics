"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DimensionsPanel = _interopRequireDefault(require("../DimensionsPanel"));

var _DimensionList = _interopRequireDefault(require("../List/DimensionList"));

describe('The Dimensions component ', function () {
  var shallowDimensions;
  var props;

  var dimensionsComponent = function dimensionsComponent() {
    if (!shallowDimensions) {
      shallowDimensions = (0, _enzyme.shallow)(_react.default.createElement(_DimensionsPanel.default, props));
    }

    return shallowDimensions;
  };

  beforeEach(function () {
    shallowDimensions = undefined;
    props = {
      dimensions: {}
    };
  });
  it('renders a div', function () {
    expect(dimensionsComponent().find('div').length).toEqual(1);
  });
  it('renders a div containing everything else', function () {
    var wrappingDiv = dimensionsComponent().find('div').first();
    expect(wrappingDiv.children()).toEqual(dimensionsComponent().children());
  });
  it('renders a DimensionList with the correct prop', function () {
    var dimensionsComp = dimensionsComponent();
    dimensionsComp.setState({
      filterText: 'filteredText'
    });
    var filteredList = dimensionsComp.find(_DimensionList.default).first();
    expect(filteredList.props().filterText).toEqual(dimensionsComp.state().filterText);
  });
});