"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionsPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Filter = _interopRequireDefault(require("../Filter/Filter"));

var _DimensionList = _interopRequireDefault(require("./List/DimensionList"));

var _DimensionsPanel = require("./styles/DimensionsPanel.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DimensionsPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(DimensionsPanel, _Component);

  function DimensionsPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DimensionsPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DimensionsPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      filterText: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onClearFilter", function () {
      _this.setState({
        filterText: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterTextChange", function (filterText) {
      _this.setState({
        filterText: filterText
      });
    });

    return _this;
  }

  _createClass(DimensionsPanel, [{
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