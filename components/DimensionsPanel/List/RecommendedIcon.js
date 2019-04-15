"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecommendedIcon = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Popper = _interopRequireDefault(require("@material-ui/core/Popper"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _RecommendedIcon = require("./styles/RecommendedIcon.style");

var RecommendedIcon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RecommendedIcon, _Component);

  function RecommendedIcon() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RecommendedIcon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RecommendedIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      anchorEl: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseOver", function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseExit", function () {
      _this.setState({
        anchorEl: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showTooltip", function () {
      return _react.default.createElement(_Popper.default, {
        anchorEl: _this.state.anchorEl,
        open: Boolean(_this.state.anchorEl),
        placement: "bottom"
      }, _react.default.createElement(_Paper.default, {
        style: _RecommendedIcon.styles.toolTip
      }, _d2I18n.default.t('Dimension recommended with selected data')));
    });
    return _this;
  }

  (0, _createClass2.default)(RecommendedIcon, [{
    key: "render",
    value: function render() {
      var TooltipOnHover = Boolean(this.state.anchorEl) ? this.showTooltip() : null;
      return this.props.isRecommended ? _react.default.createElement("div", {
        style: _RecommendedIcon.styles.recommendedWrapper
      }, _react.default.createElement("div", {
        style: _RecommendedIcon.styles.recommendedIcon,
        onMouseOver: this.onMouseOver,
        onMouseLeave: this.onMouseExit
      }, TooltipOnHover)) : null;
    }
  }]);
  return RecommendedIcon;
}(_react.Component);

exports.RecommendedIcon = RecommendedIcon;
RecommendedIcon.propTypes = {
  id: _propTypes.default.string.isRequired,
  isSelected: _propTypes.default.bool.isRequired,
  isRecommended: _propTypes.default.bool.isRequired
};
var _default = RecommendedIcon;
exports.default = _default;