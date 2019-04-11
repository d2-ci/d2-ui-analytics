"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionList = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DimensionItem = _interopRequireDefault(require("./DimensionItem"));

var _DimensionList = require("./styles/DimensionList.style");

var DimensionList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DimensionList, _Component);

  function DimensionList() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimensionList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DimensionList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filterTextContains", function (dimensionName) {
      return dimensionName.toLowerCase().includes(_this.props.filterText.toLowerCase());
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filterMatchingDimensions", function (dimension) {
      return _this.filterTextContains(dimension.name) ? _this.renderItem(dimension) : null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isDisabled", function (dimension) {
      return _this.props.disabledDimension(dimension) || false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isRecommended", function (dimension) {
      return _this.props.recommendedDimension(dimension) || false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderItem", function (dimension) {
      return _react.default.createElement(_DimensionItem.default, {
        id: dimension.id,
        key: dimension.id,
        name: dimension.name,
        isSelected: _this.props.selectedIds.includes(dimension.id),
        isRecommended: _this.isRecommended(dimension),
        isDeactivated: _this.isDisabled(dimension),
        onClick: _this.props.onDimensionClick,
        onOptionsClick: _this.props.onDimensionOptionsClick,
        onDragStart: _this.props.onDimensionDragStart
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DimensionList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var dimensionsList = Object.values(this.props.dimensions).map(function (dimension) {
        return _this2.props.filterText.length ? _this2.filterMatchingDimensions(dimension) : _this2.renderItem(dimension);
      });
      return _react.default.createElement("div", {
        style: _DimensionList.styles.listWrapper
      }, _react.default.createElement("ul", {
        style: _DimensionList.styles.list
      }, dimensionsList));
    }
  }]);
  return DimensionList;
}(_react.Component);

exports.DimensionList = DimensionList;
DimensionList.propTypes = {
  dimensions: _propTypes.default.object.isRequired,
  disabledDimension: _propTypes.default.func,
  recommendedDimension: _propTypes.default.func,
  selectedIds: _propTypes.default.array,
  filterText: _propTypes.default.string.isRequired,
  onDimensionOptionsClick: _propTypes.default.func,
  onDimensionClick: _propTypes.default.func,
  onDimensionDragStart: _propTypes.default.func
};
DimensionList.defaultProps = {
  selectedIds: [],
  disabledDimension: Function.prototype,
  recommendedDimension: Function.prototype
};
var _default = DimensionList;
exports.default = _default;