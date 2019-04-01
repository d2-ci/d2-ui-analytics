'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UnselectedItems = require('./UnselectedItems');

var _UnselectedItems2 = _interopRequireDefault(_UnselectedItems);

var _SelectedItems = require('./SelectedItems');

var _SelectedItems2 = _interopRequireDefault(_SelectedItems);

var _ItemSelector = require('./styles/ItemSelector.style');

var _ItemSelector2 = _interopRequireDefault(_ItemSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemSelector = function (_Component) {
    (0, _inherits3.default)(ItemSelector, _Component);

    function ItemSelector() {
        (0, _classCallCheck3.default)(this, ItemSelector);
        return (0, _possibleConstructorReturn3.default)(this, (ItemSelector.__proto__ || (0, _getPrototypeOf2.default)(ItemSelector)).apply(this, arguments));
    }

    (0, _createClass3.default)(ItemSelector, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                unselected = _props.unselected,
                selected = _props.selected,
                filterZone = _props.children;


            return _react2.default.createElement(
                'div',
                {
                    className: 'jsx-' + _ItemSelector2.default.__hash + ' ' + 'item-selector-container'
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _ItemSelector2.default.__hash + ' ' + ((0, _classnames2.default)('section', 'unselected') || '')
                    },
                    filterZone,
                    _react2.default.createElement(_UnselectedItems2.default, unselected)
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _ItemSelector2.default.__hash + ' ' + ((0, _classnames2.default)('section', 'selected') || '')
                    },
                    _react2.default.createElement(_SelectedItems2.default, selected)
                ),
                _react2.default.createElement(
                    _style2.default,
                    {
                        id: _ItemSelector2.default.__hash
                    },
                    _ItemSelector2.default
                )
            );
        }
    }]);
    return ItemSelector;
}(_react.Component);

ItemSelector.propTypes = {
    unselected: _propTypes2.default.shape({
        items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            id: _propTypes2.default.string.isRequired,
            name: _propTypes2.default.string.isRequired
        })).isRequired,
        onSelect: _propTypes2.default.func.isRequired,
        filterText: _propTypes2.default.string,
        requestMoreItems: _propTypes2.default.func
    }),
    selected: _propTypes2.default.shape({
        items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            id: _propTypes2.default.string.isRequired,
            name: _propTypes2.default.string.isRequired
        })).isRequired,
        dialogId: _propTypes2.default.string,
        onDeselect: _propTypes2.default.func.isRequired,
        onReorder: _propTypes2.default.func.isRequired
    })
};

exports.default = ItemSelector;