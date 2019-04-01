'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DynamicDimension = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _ItemSelector = require('../ItemSelector/ItemSelector');

var _ItemSelector2 = _interopRequireDefault(_ItemSelector);

var _FilterField = require('../FilterField');

var _FilterField2 = _interopRequireDefault(_FilterField);

var _dimensions = require('../../api/dimensions');

var _DynamicDimension = require('./styles/DynamicDimension.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicDimension = exports.DynamicDimension = function (_Component) {
    (0, _inherits3.default)(DynamicDimension, _Component);

    function DynamicDimension() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DynamicDimension);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DynamicDimension.__proto__ || (0, _getPrototypeOf2.default)(DynamicDimension)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            filterText: '',
            nextPage: null,
            items: [],
            unselectedIds: [],
            selectedIds: []
        }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var items;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _dimensions.apiFetchItemsByDimension)(_this.props.d2, _this.props.dialogId);

                        case 2:
                            items = _context.sent;


                            _this.setState({ items: items });

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.onClearFilter = function () {
            _this.setState({ filterText: '' });
        }, _this.onFilterTextChange = function (filterText) {
            var filteredItems = _this.state.items.map(function (item) {
                return item.name.toLowerCase().includes(filterText.toLowerCase()) && item.id;
            });

            _this.setState({
                filterText: filterText,
                unselectedIds: filteredItems
            });
        }, _this.selectItemsByDimensions = function (selectedIds) {
            var unselectedIds = _this.state.unselectedIds.filter(function (id) {
                return !selectedIds.includes(id);
            });
            _this.setState({ unselectedIds: unselectedIds });

            var itemsToAdd = _this.state.items.filter(function (di) {
                return selectedIds.includes(di.id);
            });

            _this.props.onSelect({
                dimensionType: _this.props.dialogId,
                value: itemsToAdd
            });
        }, _this.deselectItemsByDimensions = function (ids) {
            var unselectedIds = [].concat((0, _toConsumableArray3.default)(new _set2.default([].concat((0, _toConsumableArray3.default)(_this.state.unselectedIds), (0, _toConsumableArray3.default)(ids)))));
            _this.setState({ unselectedIds: unselectedIds });

            _this.props.onDeselect({
                dimensionType: _this.props.dialogId,
                value: ids
            });
        }, _this.getUnselectedItems = function () {
            return _this.state.items.filter(function (item) {
                return !_this.props.selectedItems.includes(item.id);
            });
        }, _this.setUiItems = function (items) {
            return _this.props.onReorder({
                dimensionType: _this.props.dialogId,
                value: items
            });
        }, _this.render = function () {
            var filterZone = function filterZone() {
                return _react2.default.createElement(_FilterField2.default, {
                    text: _this.state.filterText,
                    onFilterTextChange: _this.onFilterTextChange,
                    onClearFilter: _this.onClearFilter
                });
            };

            var unselected = {
                items: _this.getUnselectedItems(),
                onSelect: _this.selectItemsByDimensions,
                filterText: _this.state.filterText
            };

            var selected = {
                items: _this.props.selectedItems,
                dialogId: _this.props.dialogId,
                onDeselect: _this.deselectItemsByDimensions,
                onReorder: _this.setUiItems
            };

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _DialogTitle2.default,
                    null,
                    _this.props.dialogTitle
                ),
                _react2.default.createElement(
                    _DialogContent2.default,
                    { style: _DynamicDimension.styles.dialogContent },
                    _react2.default.createElement(
                        _ItemSelector2.default,
                        {
                            itemClassName: 'dynamic-dimension',
                            unselected: unselected,
                            selected: selected
                        },
                        filterZone()
                    )
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return DynamicDimension;
}(_react.Component);

DynamicDimension.propTypes = {
    d2: _propTypes2.default.object.isRequired,
    dialogId: _propTypes2.default.string.isRequired,
    dialogTitle: _propTypes2.default.string.isRequired,
    selectedItems: _propTypes2.default.array.isRequired,
    onSelect: _propTypes2.default.func.isRequired,
    onDeselect: _propTypes2.default.func.isRequired,
    onReorder: _propTypes2.default.func.isRequired
};

DynamicDimension.defaultProps = {
    selectedItems: [],
    onSelect: Function.prototype,
    onDeselect: Function.prototype,
    onReorder: Function.prototype
};

exports.default = DynamicDimension;