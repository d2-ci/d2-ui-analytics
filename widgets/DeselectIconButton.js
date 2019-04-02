'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeselectIconButton = undefined;

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _DeselectIconButton = require('./styles/DeselectIconButton.style');

var _DeselectIconButton2 = _interopRequireDefault(_DeselectIconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeselectIconButton = exports.DeselectIconButton = function DeselectIconButton(_ref) {
    var fill = _ref.fill,
        _onClick = _ref.onClick;

    var iconStyle = {
        height: '13px',
        width: '10px',
        fill: fill
    };

    return _react2.default.createElement(
        'button',
        {
            onClick: function onClick(e) {
                e.stopPropagation();
                _onClick();
            },
            className: 'jsx-' + _DeselectIconButton2.default.__hash + ' ' + 'deselect-icon-button'
        },
        _react2.default.createElement(
            'span',
            {
                className: 'jsx-' + _DeselectIconButton2.default.__hash
            },
            _react2.default.createElement(_Close2.default, { style: iconStyle })
        ),
        _react2.default.createElement(
            _style2.default,
            {
                id: _DeselectIconButton2.default.__hash
            },
            _DeselectIconButton2.default
        )
    );
};

DeselectIconButton.propTypes = {
    fill: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired
};

exports.default = DeselectIconButton;