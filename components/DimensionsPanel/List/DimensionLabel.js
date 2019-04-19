"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionLabel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DimensionLabel = require("./styles/DimensionLabel.style");

var DimensionLabel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DimensionLabel, _Component);

  function DimensionLabel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimensionLabel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DimensionLabel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLabelClick", function () {
      if (!_this.props.isDeactivated) {
        _this.props.onClick(_this.props.id);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeyPress", function (event) {
      if (event.key === 'Enter' && event.ctrlKey === false) {
        _this.onLabelClick();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(DimensionLabel, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        "data-test": "dimension-id-".concat(this.props.id),
        className: "label",
        onClick: this.onLabelClick,
        onKeyPress: this.onKeyPress,
        tabIndex: 0,
        style: _DimensionLabel.styles.label
      }, this.props.children);
    }
  }]);
  return DimensionLabel;
}(_react.Component);

exports.DimensionLabel = DimensionLabel;
(0, _defineProperty2.default)(DimensionLabel, "propTypes", {
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  isDeactivated: _propTypes.default.bool.isRequired,
  isSelected: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func.isRequired,
  children: _propTypes.default.arrayOf(_propTypes.default.element).isRequired
});
var _default = DimensionLabel;
exports.default = _default;