"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DeselectIconButton = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _DeselectIconButton = _interopRequireDefault(require("./styles/DeselectIconButton.style"));

var DeselectIconButton = function DeselectIconButton(_ref) {
  var fill = _ref.fill,
      _onClick = _ref.onClick;
  var iconStyle = {
    height: '13px',
    width: '10px',
    fill: fill
  };
  return _react.default.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();

      _onClick();
    },
    className: "jsx-".concat(_DeselectIconButton.default.__hash) + " " + "deselect-icon-button"
  }, _react.default.createElement("span", {
    className: "jsx-".concat(_DeselectIconButton.default.__hash)
  }, _react.default.createElement(_Close.default, {
    style: iconStyle
  })), _react.default.createElement(_style.default, {
    id: _DeselectIconButton.default.__hash
  }, _DeselectIconButton.default));
};

exports.DeselectIconButton = DeselectIconButton;
DeselectIconButton.propTypes = {
  fill: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func.isRequired
};
var _default = DeselectIconButton;
exports.default = _default;