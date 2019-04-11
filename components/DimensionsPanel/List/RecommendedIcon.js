"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecommendedIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Popper = _interopRequireDefault(require("@material-ui/core/Popper"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _RecommendedIcon = require("./styles/RecommendedIcon.style");

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

var RecommendedIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(RecommendedIcon, _Component);

  function RecommendedIcon() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RecommendedIcon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RecommendedIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      anchorEl: null
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseExit", function () {
      _this.setState({
        anchorEl: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showTooltip", function () {
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

  _createClass(RecommendedIcon, [{
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