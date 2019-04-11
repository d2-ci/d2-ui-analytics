"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref2 =
/*#__PURE__*/
_react.default.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
});

var _ref3 =
/*#__PURE__*/
_react.default.createElement("path", {
  d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
});

var MoreHorizontalIcon = function MoreHorizontalIcon(_ref) {
  var style = _ref.style;
  return _react.default.createElement("svg", {
    style: _objectSpread({}, style),
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "24",
    viewBox: "0 0 24 24"
  }, _ref2, _ref3);
};

var _default = MoreHorizontalIcon;
exports.default = _default;