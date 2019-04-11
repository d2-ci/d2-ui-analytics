"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Filter = _interopRequireDefault(require("../Filter"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The Filter component ', function () {
  var shallowFilter;
  var props;

  var filterComp = function filterComp() {
    if (!shallowFilter) {
      shallowFilter = (0, _enzyme.shallow)(_react.default.createElement(_Filter.default, props));
    }

    return shallowFilter;
  };

  beforeEach(function () {
    props = {
      placeholder: 'testplaceholder',
      text: '',
      onChange: jest.fn(),
      onClear: jest.fn()
    };
    shallowFilter = undefined;
  });
  it('renders a TextField component containing everything esle', function () {
    expect(filterComp().find(_TextField.default).length).toEqual(1);
  });
  it('should only  render a search Icon as startAdornment when props.text have length < 1', function () {
    var filter = filterComp().find(_TextField.default);
    var startAdornment = filter.props().InputProps.startAdornment;
    var endAdornment = filter.props().InputProps.endAdornment;
    expect(startAdornment.props.children.type).toEqual(_Search.default);
    expect(endAdornment).toEqual(null);
  });
  it('should render a Search Icon and IconButton when props.text have length > 0', function () {
    props.text = 'testString';
    var filter = filterComp().find(_TextField.default);
    var startAdornment = filter.props().InputProps.startAdornment;
    var endAdornment = filter.props().InputProps.endAdornment;
    expect(startAdornment.props.children.type).toEqual(_Search.default);
    expect(endAdornment.props.children.type).toEqual(_IconButton.default);
  });
  it('should clear its value when Escape key is pressed', function () {
    props.text = 'testString';
    var filter = filterComp().find(_TextField.default);
    var mockEvent = {
      key: 'Escape',
      preventDefault: jest.fn()
    };
    filter.props().onKeyDown(mockEvent);
    expect(props.onClear).toHaveBeenCalledTimes(1);
  });
  it('should call prop onClear if onChange receives text string with length < 1 (Ctrl-A  + BackSpace)', function () {
    props.text = 'anotherTestString';
    var filter = filterComp().find(_TextField.default);
    var mockEvent = {
      target: {
        value: ''
      },
      preventDefault: jest.fn()
    };
    filter.props().onChange(mockEvent);
    expect(props.onClear).toHaveBeenCalledTimes(1);
  });
});