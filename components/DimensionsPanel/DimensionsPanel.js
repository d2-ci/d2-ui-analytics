"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionsPanel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Filter = _interopRequireDefault(require("../Filter/Filter"));

var _DimensionList = _interopRequireDefault(require("./List/DimensionList"));

var _DimensionsPanel = require("./styles/DimensionsPanel.style");

var DimensionsPanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DimensionsPanel, _Component);

  function DimensionsPanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimensionsPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DimensionsPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      filterText: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClearFilter", function () {
      _this.setState({
        filterText: ''
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFilterTextChange", function (filterText) {
      _this.setState({
        filterText: filterText
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DimensionsPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dimensions = _this$props.dimensions,
          selectedIds = _this$props.selectedIds,
          disabledDimension = _this$props.disabledDimension,
          recommendedDimension = _this$props.recommendedDimension,
          onDimensionClick = _this$props.onDimensionClick,
          onDimensionOptionsClick = _this$props.onDimensionOptionsClick,
          onDimensionDragStart = _this$props.onDimensionDragStart;
      return _react.default.createElement("div", {
        style: _DimensionsPanel.styles.divContainer
      }, _react.default.createElement(_Filter.default, {
        style: _DimensionsPanel.styles.textField,
        placeholder: _d2I18n.default.t('Search dimensions'),
        text: this.state.filterText,
        onChange: this.onFilterTextChange,
        onClear: this.onClearFilter
      }), _react.default.createElement(_DimensionList.default, {
        dimensions: dimensions,
        selectedIds: selectedIds,
        filterText: this.state.filterText,
        disabledDimension: disabledDimension,
        recommendedDimension: recommendedDimension,
        onDimensionOptionsClick: onDimensionOptionsClick,
        onDimensionClick: onDimensionClick,
        onDimensionDragStart: onDimensionDragStart
      }));
    }
  }]);
  return DimensionsPanel;
}(_react.Component);

exports.DimensionsPanel = DimensionsPanel;
DimensionsPanel.propTypes = {
  dimensions: _propTypes.default.object.isRequired,
  selectedIds: _propTypes.default.array,
  disabledDimension: _propTypes.default.func,
  recommendedDimension: _propTypes.default.func,
  onDimensionClick: _propTypes.default.func,
  onDimensionOptionsClick: _propTypes.default.func,
  onDimensionDragStart: _propTypes.default.func
};
DimensionsPanel.defaultProps = {
  selectedIds: [],
  onDimensionClick: Function.prototype
};
var _default = DimensionsPanel;
exports.default = _default;