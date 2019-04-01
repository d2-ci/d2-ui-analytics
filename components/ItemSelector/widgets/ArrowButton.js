'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrowButton = undefined;

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArrowForward = require('@material-ui/icons/ArrowForward');

var _ArrowForward2 = _interopRequireDefault(_ArrowForward);

var _ArrowBack = require('@material-ui/icons/ArrowBack');

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

var _ArrowButton = require('./styles/ArrowButton.style');

var _ArrowButton2 = _interopRequireDefault(_ArrowButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrowButton = exports.ArrowButton = function ArrowButton(_ref) {
    var onClick = _ref.onClick,
        iconType = _ref.iconType;
    return _react2.default.createElement(
        'button',
        {
            onClick: onClick,
            className: 'jsx-' + _ArrowButton2.default.__hash + ' ' + 'arrow-button'
        },
        _react2.default.createElement(
            'span',
            {
                className: 'jsx-' + _ArrowButton2.default.__hash + ' ' + 'arrow-icon'
            },
            iconType === 'arrowForward' ? _react2.default.createElement(_ArrowForward2.default, null) : _react2.default.createElement(_ArrowBack2.default, null)
        ),
        _react2.default.createElement(
            _style2.default,
            {
                id: _ArrowButton2.default.__hash
            },
            _ArrowButton2.default
        )
    );
};

exports.default = ArrowButton;