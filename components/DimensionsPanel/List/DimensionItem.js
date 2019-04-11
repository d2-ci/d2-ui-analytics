"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionItem = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _DimensionLabel = _interopRequireDefault(require("./DimensionLabel"));

var _RecommendedIcon = _interopRequireDefault(require("./RecommendedIcon"));

var _OptionsButton = _interopRequireDefault(require("./OptionsButton"));

var _DynamicDimensionIcon = _interopRequireDefault(require("../../../assets/DynamicDimensionIcon"));

var _fixedDimensions = require("../../../modules/fixedDimensions");

var _DimensionItem = require("./styles/DimensionItem.style");

var DimensionItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DimensionItem, _Component);

  function DimensionItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimensionItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DimensionItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      mouseOver: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOptionsClick", function (id) {
      return function (event) {
        return _this.props.onOptionsClick(event, id);
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseOver", function () {
      _this.setState({
        mouseOver: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseExit", function () {
      _this.setState({
        mouseOver: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDimensionIcon", function () {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDimensionType", function () {
      var _this$props = _this.props,
          id = _this$props.id,
          name = _this$props.name,
          isDeactivated = _this$props.isDeactivated,
          onDragStart = _this$props.onDragStart;
      return _react.default.createElement("span", {
        "data-dimensionid": id,
        style: (0, _objectSpread2.default)({}, _DimensionItem.styles.text, isDeactivated ? _DimensionItem.styles.textDeactivated : {}),
        draggable: !isDeactivated,
        onDragStart: onDragStart
      }, _d2I18n.default.t(name));
    });
    return _this;
  }

  (0, _createClass2.default)(DimensionItem, [{
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
      var listItemStyle = isSelected && !isDeactivated ? (0, _objectSpread2.default)({}, _DimensionItem.styles.listItem, _DimensionItem.styles.selectedListItem) : _DimensionItem.styles.listItem;
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