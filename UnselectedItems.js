'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnselectedItems = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Button = require('@dhis2/ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _throttle = require('lodash/fp/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _UnselectedItem = require('./widgets/UnselectedItem');

var _UnselectedItem2 = _interopRequireDefault(_UnselectedItem);

var _ArrowButton = require('./widgets/ArrowButton');

var _toggler = require('./modules/toggler');

var _UnselectedItems = require('./styles/UnselectedItems.style');

var _UnselectedItems2 = _interopRequireDefault(_UnselectedItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnselectedItems = exports.UnselectedItems = function (_Component) {
    (0, _inherits3.default)(UnselectedItems, _Component);

    function UnselectedItems(props) {
        (0, _classCallCheck3.default)(this, UnselectedItems);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UnselectedItems.__proto__ || (0, _getPrototypeOf2.default)(UnselectedItems)).call(this, props));

        _this.state = { highlighted: [], lastClickedIndex: 0 };

        _this.onSelectClick = function () {
            _this.props.onSelect(_this.state.highlighted);
            _this.setState({ highlighted: [] });
        };

        _this.onSelectAllClick = function () {
            _this.props.onSelect(_this.props.items.map(function (i) {
                return i.id;
            }));
            _this.setState({ highlighted: [] });
        };

        _this.onDoubleClickItem = function (id) {
            var highlighted = _this.state.highlighted.filter(function (dataDimId) {
                return dataDimId !== id;
            });

            _this.setState({ highlighted: highlighted });
            _this.props.onSelect([id]);
        };

        _this.filterTextContains = function (displayName) {
            return displayName.toLowerCase().includes(_this.props.filterText.toLowerCase());
        };

        _this.filterItems = function (item, index) {
            return _this.filterTextContains(item.name) ? _this.renderListItem(item, index) : null;
        };

        _this.toggleHighlight = function (isCtrlPressed, isShiftPressed, index, id) {
            var newState = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
                return item.id;
            }));

            _this.setState({
                highlighted: newState.ids,
                lastClickedIndex: newState.lastClickedIndex
            });
        };

        _this.renderListItem = function (dataDim, index) {
            return _react2.default.createElement(
                'li',
                {
                    key: dataDim.id,
                    onDoubleClick: function onDoubleClick() {
                        return _this.onDoubleClickItem(dataDim.id);
                    },
                    className: 'jsx-' + _UnselectedItems2.default.__hash + ' ' + 'unselected-list-item'
                },
                _react2.default.createElement(_UnselectedItem2.default, {
                    id: dataDim.id,
                    index: index,
                    name: dataDim.name,
                    highlighted: !!_this.state.highlighted.includes(dataDim.id),
                    onClick: _this.toggleHighlight
                }),
                _react2.default.createElement(
                    _style2.default,
                    {
                        id: _UnselectedItems2.default.__hash
                    },
                    _UnselectedItems2.default
                )
            );
        };

        _this.requestMoreItems = (0, _throttle2.default)(1000, function () {
            var node = _this.scrolElRef.current;

            if (node) {
                var bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
                if (bottom) {
                    _this.props.requestMoreItems();
                }
            }
        });

        _this.render = function () {
            var listItems = _this.props.items.map(function (item, index) {
                return _this.props.filterText.length ? _this.filterItems(item, index) : _this.renderListItem(item, index);
            });

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    {
                        ref: _this.scrolElRef,
                        onScroll: _this.requestMoreItems,
                        className: 'jsx-' + _UnselectedItems2.default.__hash + ' ' + 'unselected-list-container'
                    },
                    _react2.default.createElement(
                        'ul',
                        {
                            className: 'jsx-' + _UnselectedItems2.default.__hash + ' ' + 'unselected-list'
                        },
                        listItems
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _UnselectedItems2.default.__hash + ' ' + 'select-all-button'
                    },
                    _react2.default.createElement(_Button2.default, {
                        kind: 'secondary',
                        size: 'small',
                        onClick: _this.onSelectAllClick,
                        label: _d2I18n2.default.t('Select All')
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _UnselectedItems2.default.__hash + ' ' + 'select-highlighted-button'
                    },
                    _react2.default.createElement(_ArrowButton.ArrowButton, {
                        onClick: _this.onSelectClick,
                        iconType: 'arrowForward'
                    })
                ),
                _react2.default.createElement(
                    _style2.default,
                    {
                        id: _UnselectedItems2.default.__hash
                    },
                    _UnselectedItems2.default
                )
            );
        };

        _this.scrolElRef = _react2.default.createRef();
        return _this;
    }

    return UnselectedItems;
}(_react.Component);

UnselectedItems.propTypes = {
    items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired,
        name: _propTypes2.default.string.isRequired
    })).isRequired,
    onSelect: _propTypes2.default.func.isRequired,
    filterText: _propTypes2.default.string,
    requestMoreItems: _propTypes2.default.func
};

UnselectedItems.defaultProps = {
    requestMoreItems: function requestMoreItems() {
        return null;
    },
    filterText: ''
};

exports.default = UnselectedItems;