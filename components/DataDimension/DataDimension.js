'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataDimension = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _ItemSelector = require('../ItemSelector/ItemSelector');

var _ItemSelector2 = _interopRequireDefault(_ItemSelector);

var _DataTypesSelector = require('./DataTypesSelector');

var _DataTypesSelector2 = _interopRequireDefault(_DataTypesSelector);

var _Groups = require('./Groups');

var _Groups2 = _interopRequireDefault(_Groups);

var _FilterField = require('../FilterField');

var _FilterField2 = _interopRequireDefault(_FilterField);

var _dimensions = require('../../api/dimensions');

var _dataTypes = require('../../modules/dataTypes');

var _fixedDimensions = require('../../modules/fixedDimensions');

var _DataDimension = require('./styles/DataDimension.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dxId = _fixedDimensions.FIXED_DIMENSIONS.dx.id;

var FIRST_PAGE = 1;

var DEFAULT_ALTERNATIVES = {
    dimensionItems: [],
    nextPage: FIRST_PAGE
};

var DataDimension = exports.DataDimension = function (_Component) {
    (0, _inherits3.default)(DataDimension, _Component);

    function DataDimension() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DataDimension);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DataDimension.__proto__ || (0, _getPrototypeOf2.default)(DataDimension)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            dataType: _dataTypes.DEFAULT_DATATYPE_ID,
            groups: {
                indicators: [],
                dataElements: [],
                dataElementOperands: [],
                dataSets: [],
                eventDataItems: [],
                programIndicators: []
            },
            groupId: _dataTypes.ALL_ID,
            groupDetail: '',
            filterText: '',
            items: [],
            itemsCopy: [],
            nextPage: null,
            filter: {}
        }, _this.updateGroups = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var dataType, dataTypeGroups, groups;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dataType = _this.state.dataType;

                            if (_this.state.groups[dataType].length) {
                                _context.next = 9;
                                break;
                            }

                            _context.next = 4;
                            return (0, _dimensions.apiFetchGroups)(_this.props.d2, dataType, _this.props.displayNameProp);

                        case 4:
                            dataTypeGroups = _context.sent;
                            groups = (0, _assign2.default)({}, _this.state.groups, (0, _defineProperty3.default)({}, dataType, dataTypeGroups));

                            _this.setState({ groups: groups }, _this.updateAlternatives);
                            _context.next = 10;
                            break;

                        case 9:
                            _this.updateAlternatives();

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.onDataTypeChange = function (dataType) {
            if (dataType !== _this.state.dataType) {
                var filter = (0, _assign2.default)({}, _this.state.filter, (0, _defineProperty3.default)({}, _this.state.dataType, {
                    groupId: _this.state.groupId,
                    groupDetail: _this.state.groupDetail
                }));

                var currentFilter = _this.state.filter[dataType] || {};
                var groupId = currentFilter.groupId || (0, _dataTypes.defaultGroupId)(dataType);
                var groupDetail = currentFilter.groupDetail || (0, _dataTypes.defaultGroupDetail)(dataType);

                _this.setState({ filter: filter, dataType: dataType, groupId: groupId, groupDetail: groupDetail, filterText: '' }, _this.updateGroups);
            }
        }, _this.requestMoreItems = function () {
            if (_this.state.nextPage) {
                _this.updateAlternatives(_this.state.nextPage, true);
            }
        }, _this.updateAlternatives = function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FIRST_PAGE;
                var concatItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                var _this$state, dataType, groupId, groupDetail, filterText, _ref4, dimensionItems, nextPage, augmentFn, items;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _this$state = _this.state, dataType = _this$state.dataType, groupId = _this$state.groupId, groupDetail = _this$state.groupDetail, filterText = _this$state.filterText;
                                _context2.next = 3;
                                return (0, _dimensions.apiFetchAlternatives)({
                                    d2: _this.props.d2,
                                    dataType: dataType,
                                    groupId: groupId,
                                    groupDetail: groupDetail,
                                    page: page,
                                    filterText: filterText,
                                    nameProp: _this.props.displayNameProp
                                });

                            case 3:
                                _context2.t0 = _context2.sent;

                                if (_context2.t0) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.t0 = DEFAULT_ALTERNATIVES;

                            case 6:
                                _ref4 = _context2.t0;
                                dimensionItems = _ref4.dimensionItems;
                                nextPage = _ref4.nextPage;
                                augmentFn = _dataTypes.dataTypes[dataType].augmentAlternatives;

                                if (augmentFn) {
                                    dimensionItems = augmentFn(dimensionItems, groupId);
                                }

                                items = concatItems ? _this.state.items.concat(dimensionItems) : dimensionItems;


                                _this.setState({
                                    items: items.filter(function (di) {
                                        return !_this.props.selectedDimensions.includes(di.id);
                                    }),
                                    itemsCopy: items,
                                    nextPage: nextPage
                                });

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function () {
                return _ref3.apply(this, arguments);
            };
        }(), _this.onGroupChange = function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(groupId) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (groupId !== _this.state.groupId) {
                                    _this.setState({ groupId: groupId }, _this.updateAlternatives);
                                }

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2);
            }));

            return function (_x3) {
                return _ref5.apply(this, arguments);
            };
        }(), _this.onDetailChange = function (groupDetail) {
            if (groupDetail !== _this.state.groupDetail) {
                _this.setState({ groupDetail: groupDetail }, _this.updateAlternatives);
            }
        }, _this.onClearFilter = function () {
            _this.setState({ filterText: '' }, (0, _debounce2.default)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt('return', _this.updateAlternatives());

                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this2);
            })), 300));
        }, _this.onFilterTextChange = function (filterText) {
            _this.setState({ filterText: filterText }, (0, _debounce2.default)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt('return', _this.updateAlternatives());

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this2);
            })), 300));
        }, _this.selectDataDimensions = function (selectedIds) {
            var itemsToAdd = (0, _keyBy2.default)(_this.state.items.filter(function (di) {
                return selectedIds.includes(di.id);
            }), 'id');

            _this.props.onSelect({ dimensionType: dxId, value: itemsToAdd });
        }, _this.deselectDataDimensions = function (ids) {
            _this.props.onDeselect({
                dimensionType: dxId,
                value: ids
            });
        }, _this.setUiItems = function (items) {
            return _this.props.onReorder({
                dimensionType: dxId,
                items: items
            });
        }, _this.render = function () {
            var groups = _this.state.groups[_this.state.dataType] || [];

            var filterZone = function filterZone() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_DataTypesSelector2.default, {
                        currentDataType: _this.state.dataType,
                        onDataTypeChange: _this.onDataTypeChange
                    }),
                    _react2.default.createElement(_Groups2.default, {
                        dataType: _this.state.dataType,
                        groups: groups,
                        groupId: _this.state.groupId,
                        onGroupChange: _this.onGroupChange,
                        onDetailChange: _this.onDetailChange,
                        detailValue: _this.state.groupDetail
                    }),
                    _react2.default.createElement(_FilterField2.default, {
                        text: _this.state.filterText,
                        onFilterTextChange: _this.onFilterTextChange,
                        onClearFilter: _this.onClearFilter
                    })
                );
            };

            var unselected = {
                items: _this.state.items,
                onSelect: _this.selectDataDimensions,
                filterText: _this.state.filterText,
                requestMoreItems: _this.requestMoreItems
            };

            var selected = {
                items: _this.props.selectedDimensions,
                dialogId: dxId,
                onDeselect: _this.deselectDataDimensions,
                onReorder: _this.setUiItems
            };

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _DialogTitle2.default,
                    null,
                    _d2I18n2.default.t('Data')
                ),
                _react2.default.createElement(
                    _DialogContent2.default,
                    { style: _DataDimension.styles.dialogContent },
                    _react2.default.createElement(
                        _ItemSelector2.default,
                        {
                            itemClassName: 'data-dimension',
                            unselected: unselected,
                            selected: selected
                        },
                        filterZone()
                    )
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // defaults


    (0, _createClass3.default)(DataDimension, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateGroups();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var prevItems = prevProps.selectedDimensions;
            var currentItems = this.props.selectedDimensions;

            if (!(0, _isEqual2.default)(prevItems, currentItems)) {
                this.setState({
                    items: this.state.itemsCopy.filter(function (di) {
                        return !currentItems.includes(di.id);
                    })
                });
            }
        }
    }]);
    return DataDimension;
}(_react.Component);

DataDimension.propTypes = {
    d2: _propTypes2.default.object.isRequired,
    displayNameProp: _propTypes2.default.string.isRequired,
    selectedDimensions: _propTypes2.default.array.isRequired,
    onSelect: _propTypes2.default.func.isRequired,
    onDeselect: _propTypes2.default.func.isRequired,
    onReorder: _propTypes2.default.func.isRequired
};

DataDimension.defaultProps = {
    selectedDimensions: [],
    onSelect: Function.prototype,
    onDeselect: Function.prototype,
    onReorder: Function.prototype
};

exports.default = DataDimension;