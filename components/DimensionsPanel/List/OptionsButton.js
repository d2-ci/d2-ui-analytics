'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OptionsButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _MoreHorizontalIcon = require('../../../assets/MoreHorizontalIcon');

var _MoreHorizontalIcon2 = _interopRequireDefault(_MoreHorizontalIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionsButton = exports.OptionsButton = function OptionsButton(_ref) {
    var style = _ref.style,
        onClick = _ref.onClick;
    return _react2.default.createElement(
        _IconButton2.default,
        { style: style, onClick: onClick },
        _react2.default.createElement(_MoreHorizontalIcon2.default, null)
    );
};

exports.default = OptionsButton;