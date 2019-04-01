'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ItemIcon = require('./ItemIcon');

var _ItemIcon2 = _interopRequireDefault(_ItemIcon);

var _colors = require('../styles/colors');

var _UnselectedItem = require('./styles/UnselectedItem.style');

var _UnselectedItem2 = _interopRequireDefault(_UnselectedItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onClickWrapper = function onClickWrapper(_ref) {
    var id = _ref.id,
        index = _ref.index,
        onClick = _ref.onClick;
    return function (event) {
        return onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);
    };
};

var Item = function Item(_ref2) {
    var name = _ref2.name,
        highlighted = _ref2.highlighted,
        rest = (0, _objectWithoutProperties3.default)(_ref2, ['name', 'highlighted']);

    return _react2.default.createElement(
        'div',
        {
            onClick: onClickWrapper(rest),
            'data-test': 'dimension-item-' + rest.id,
            className: 'jsx-' + _UnselectedItem2.default.__hash + ' ' + ((0, _classnames2.default)('item', { 'highlighted-item': highlighted, 'unselected-item': !highlighted }) || '')
        },
        _react2.default.createElement(_ItemIcon2.default, { backgroundColor: _colors.colors.grey }),
        _react2.default.createElement(
            'span',
            {
                className: 'jsx-' + _UnselectedItem2.default.__hash + ' ' + ((0, _classnames2.default)('item-label', { 'highlighted-text': highlighted }) || '')
            },
            name
        ),
        _react2.default.createElement(
            _style2.default,
            {
                id: _UnselectedItem2.default.__hash
            },
            _UnselectedItem2.default
        )
    );
};

exports.Item = Item;
Item.defualtProps = {
    onClick: function onClick() {
        return null;
    }
};

Item.propTypes = {
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    index: _propTypes2.default.number.isRequired,
    highlighted: _propTypes2.default.bool.isRequired,
    onClick: _propTypes2.default.func
};

exports.default = Item;