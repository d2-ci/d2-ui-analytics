"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _DimensionLabel = _interopRequireDefault(require("./DimensionLabel"));

var _RecommendedIcon = _interopRequireDefault(require("./RecommendedIcon"));

var _OptionsButton = _interopRequireDefault(require("./OptionsButton"));

var _DynamicDimensionIcon = _interopRequireDefault(require("../../../assets/DynamicDimensionIcon"));

var _fixedDimensions = require("../../../modules/fixedDimensions");

var _DimensionItem = require("./styles/DimensionItem.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DimensionItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DimensionItem, _Component);

  function DimensionItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DimensionItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DimensionItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      mouseOver: false
    });

    _defineProperty(_assertThisInitialized(_this), "onOptionsClick", function (id) {
      return function (event) {
        return _this.props.onOptionsClick(event, id);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      _this.setState({
        mouseOver: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseExit", function () {
      _this.setState({
        mouseOver: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDimensionIcon", function () {
      var fixedDimension = _fixedDimensions.FIXED_DIMENSIONS[_this.props.id];

      if (fixedDimension) {
        var Icon = fixedDimension.icon;
        return _react.default.createElement(Icon, {
          style: _DimensionItem.styles.fixedDimensionIcon
        });
      }

      return _react.default.createElement(_DynamicDimensionIcon.default, {
        style: _DimensionItem.styles.dynamicDimensionIcon
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDimensionType", function () {
      var _this$props = _this.props,
          id = _this$props.id,
          name = _this$props.name,
          isDeactivated = _this$props.isDeactivated,
          onDragStart = _this$props.onDragStart;
      return _react.default.createElement("span", {
        "data-dimensionid": id,
        style: _objectSpread({}, _DimensionItem.styles.text, isDeactivated ? _DimensionItem.styles.textDeactivated : {}),
        draggable: !isDeactivated,
        onDragStart: onDragStart
      }, _d2I18n.default.t(name));
    });

    return _this;
  }

  _createClass(DimensionItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          isDeactivated = _this$props2.isDeactivated,
          isSelected = _this$props2.isSelected,
          isRecommended = _this$props2.isRecommended,
          onOptionsClick = _this$props2.onOptionsClick;
      var Icon = this.getDimensionIcon();
      var Label = this.getDimensionType();
      var listItemStyle = isSelected && !isDeactivated ? _objectSpread({}, _DimensionItem.styles.listItem, _DimensionItem.styles.selectedListItem) : _DimensionItem.styles.listItem;
      return _react.default.createElement("li", {
        style: listItemStyle,
        onMouseOver: this.onMouseOver,
        onMouseLeave: this.onMouseExit
      }, _react.default.createElement(_DimensionLabel.default, this.props, _react.default.createElement("div", {
        style: _DimensionItem.styles.iconWrapper
      }, Icon), Label, _react.default.createElement(_RecommendedIcon.default, {
        id: id,
        isSelected: isSelected,
        isRecommended: isRecommended
      })), onOptionsClick ? _react.default.createElement("div", {
        style: _DimensionItem.styles.optionsWrapper
      }, this.state.mouseOver && !isDeactivated ? _react.default.createElement(_OptionsButton.default, {
        style: _DimensionItem.styles.optionsButton,
        onClick: this.onOptionsClick(id)
      }) : null) : null);
    }
  }]);

  return DimensionItem;
}(_react.Component);

exports.DimensionItem = DimensionItem;
DimensionItem.propTypes = {
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  isDeactivated: _propTypes.default.bool,
  isSelected: _propTypes.default.bool.isRequired,
  // XXX
  isRecommended: _propTypes.default.bool,
  onOptionsClick: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDragStart: _propTypes.default.func
};
DimensionItem.defaultProps = {
  isDeactivated: false,
  isRecommended: false,
  isSelected: false
};
var _default = DimensionItem;
exports.default = _default;