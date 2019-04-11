"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DimensionItem = _interopRequireDefault(require("./DimensionItem"));

var _DimensionList = require("./styles/DimensionList.style");

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

var DimensionList =
/*#__PURE__*/
function (_Component) {
  _inherits(DimensionList, _Component);

  function DimensionList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DimensionList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DimensionList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "filterTextContains", function (dimensionName) {
      return dimensionName.toLowerCase().includes(_this.props.filterText.toLowerCase());
    });

    _defineProperty(_assertThisInitialized(_this), "filterMatchingDimensions", function (dimension) {
      return _this.filterTextContains(dimension.name) ? _this.renderItem(dimension) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function (dimension) {
      return _this.props.disabledDimension(dimension) || false;
    });

    _defineProperty(_assertThisInitialized(_this), "isRecommended", function (dimension) {
      return _this.props.recommendedDimension(dimension) || false;
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (dimension) {
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

  _createClass(DimensionList, [{
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