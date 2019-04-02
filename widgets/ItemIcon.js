'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemIcon = function ItemIcon(_ref) {
    var backgroundColor = _ref.backgroundColor;

    return _react2.default.createElement(
        'div',
        {
            className: _style2.default.dynamic([['921056640', [backgroundColor]]])
        },
        _react2.default.createElement(
            _style2.default,
            {
                id: '921056640',
                dynamic: [backgroundColor]
            },
            'div.__jsx-style-dynamic-selector{background-color:' + backgroundColor + ';min-height:6px;min-width:6px;margin:0px 5px;}'
        )
    );
};

exports.default = ItemIcon;