"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MoreHorizontalIcon = function MoreHorizontalIcon(_ref) {
    var style = _ref.style;

    return _react2.default.createElement(
        "svg",
        {
            style: (0, _extends3.default)({}, style),
            xmlns: "http://www.w3.org/2000/svg",
            width: "22",
            height: "24",
            viewBox: "0 0 24 24"
        },
        _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
        _react2.default.createElement("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    );
};

exports.default = MoreHorizontalIcon;