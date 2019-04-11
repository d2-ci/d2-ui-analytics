"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OptionsButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _MoreHorizontalIcon = _interopRequireDefault(require("../../../assets/MoreHorizontalIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 =
/*#__PURE__*/
_react.default.createElement(_MoreHorizontalIcon.default, null);

var OptionsButton = function OptionsButton(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick;
  return _react.default.createElement(_IconButton.default, {
    style: style,
    onClick: onClick
  }, _ref2);
};

exports.OptionsButton = OptionsButton;
var _default = OptionsButton;
exports.default = _default;