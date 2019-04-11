"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireDefault(require("react"));

var ItemIcon = function ItemIcon(_ref) {
  var backgroundColor = _ref.backgroundColor;
  return _react.default.createElement("div", {
    className: _style.default.dynamic([["921056640", [backgroundColor]]])
  }, _react.default.createElement(_style.default, {
    id: "921056640",
    dynamic: [backgroundColor]
  }, "div.__jsx-style-dynamic-selector{background-color:".concat(backgroundColor, ";min-height:6px;min-width:6px;margin:0px 5px;}")));
};

var _default = ItemIcon;
exports.default = _default;