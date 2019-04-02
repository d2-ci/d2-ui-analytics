'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectedItems = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _reactBeautifulDnd = require('react-beautiful-dnd');

var _fp = require('lodash/fp');

var _SelectedItem = require('./widgets/SelectedItem');

var _SelectedItem2 = _interopRequireDefault(_SelectedItem);

var _ArrowButton = require('./widgets/ArrowButton');

var _toggler = require('./modules/toggler');

var _SelectedItems = require('./styles/SelectedItems.style');

var _SelectedItems2 = _interopRequireDefault(_SelectedItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subtitle = function Subtitle() {
    return _react2.default.createElement(
        'div',
        {
            className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + 'subtitle-container'
        },
        _react2.default.createElement(
            'span',
            {
                className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + 'subtitle-text'
            },
            _d2I18n2.default.t('Selected Data')
        ),
        _react2.default.createElement(
            _style2.default,
            {
                id: _SelectedItems2.default.__hash
            },
            _SelectedItems2.default
        )
    );
};

var ItemsList = function ItemsList(_ref) {
    var innerRef = _ref.innerRef,
        children = _ref.children;
    return _react2.default.createElement(
        'ul',
        { ref: innerRef, className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + 'selected-list'
        },
        children,
        _react2.default.createElement(
            _style2.default,
            {
                id: _SelectedItems2.default.__hash
            },
            _SelectedItems2.default
        )
    );
};

var CLONE_INDEX = 9999; // a high number to not influence the actual item list

var SelectedItems = exports.SelectedItems = function (_Component) {
    (0, _inherits3.default)(SelectedItems, _Component);

    function SelectedItems() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SelectedItems);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SelectedItems.__proto__ || (0, _getPrototypeOf2.default)(SelectedItems)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { highlighted: [], lastClickedIndex: 0, draggingId: null }, _this.onDeselectHighlighted = function () {
            _this.props.onDeselect(_this.state.highlighted);
            _this.setState({ highlighted: [] });
        }, _this.onDeselectOne = function (id) {
            var highlighted = _this.state.highlighted.filter(function (highlightedId) {
                return highlightedId !== id;
            });

            _this.props.onDeselect([id]);
            _this.setState({ highlighted: highlighted });
        }, _this.onDeselectAll = function () {
            _this.props.onDeselect(_this.props.items.map(function (item) {
                return item.id;
            }));
            _this.setState({ highlighted: [] });
        }, _this.toggleHighlight = function (isCtrlPressed, isShiftPressed, index, id) {
            var newState = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
                return item.id;
            }));

            _this.setState({
                highlighted: newState.ids,
                lastClickedIndex: newState.lastClickedIndex
            });
        }, _this.isMultiDrag = function (draggableId) {
            return _this.state.highlighted.includes(draggableId) && _this.state.highlighted.length > 1;
        }, _this.onDragStart = function (start) {
            var id = start.draggableId;
            var selected = _this.state.highlighted.find(function (itemId) {
                return itemId === id;
            });

            // if dragging an item that is not highlighted, unhighlight all items
            if (!selected) {
                _this.setState({ highlighted: [] });
            }

            _this.setState({ draggingId: start.draggableId });
        }, _this.reorderList = function (destination, source, draggableId) {
            var list = (0, _from2.default)(_this.props.items.map(function (item) {
                return item.id;
            }));

            if (_this.isMultiDrag(draggableId)) {
                var indexedItemsToMove = (0, _fp.sortBy)(_this.state.highlighted.map(function (item) {
                    return {
                        item: item,
                        idx: _this.props.items.map(function (item) {
                            return item.id;
                        }).indexOf(item)
                    };
                }), 'idx');

                var destinationIndex = destination.index;

                if (destinationIndex < _this.props.items.length - 1 && destinationIndex > 1) {
                    indexedItemsToMove.forEach(function (indexed) {
                        if (indexed.idx < destinationIndex) {
                            --destinationIndex;
                        }
                    });
                }

                indexedItemsToMove.forEach(function (indexed) {
                    var idx = list.indexOf(indexed.item);
                    list.splice(idx, 1);
                });

                indexedItemsToMove.forEach(function (indexed, i) {
                    list.splice(destinationIndex + i, 0, indexed.item);
                });
            } else {
                list.splice(source.index, 1);
                list.splice(destination.index, 0, draggableId);
            }

            return list;
        }, _this.onDragEnd = function (_ref3) {
            var destination = _ref3.destination,
                source = _ref3.source,
                draggableId = _ref3.draggableId;

            _this.setState({ draggingId: null });

            if (destination === null) {
                return;
            }

            if (destination.draggableId === source.draggableId && destination.index === source.index) {
                return;
            }

            var newList = _this.reorderList(destination, source, draggableId);

            _this.props.onReorder(newList);
        }, _this.renderListItem = function (_ref4, index) {
            var id = _ref4.id,
                name = _ref4.name;
            return _react2.default.createElement(
                _reactBeautifulDnd.Draggable,
                { draggableId: id, index: index, key: id },
                function (provided, snapshot) {
                    var isDraggedItem = snapshot.isDragging && _this.state.highlighted.length > 1 && _this.state.highlighted.includes(_this.state.draggingId);

                    var ghost = _this.state.highlighted.includes(id) && Boolean(_this.state.draggingId) && _this.state.draggingId !== id;

                    var itemText = isDraggedItem ? _this.state.highlighted.length + ' items' : name;

                    return _react2.default.createElement(
                        'li',
                        (0, _extends3.default)({
                            id: id,
                            onDoubleClick: function onDoubleClick() {
                                return _this.onDeselectOne(id);
                            }
                        }, provided.draggableProps, provided.dragHandleProps, {
                            ref: provided.innerRef,
                            className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || 'selected-list-item')
                        }),
                        _react2.default.createElement(_SelectedItem2.default, {
                            id: id,
                            index: index,
                            name: itemText,
                            highlighted: !!_this.state.highlighted.includes(id),
                            onRemoveItem: _this.onDeselectOne,
                            onClick: _this.toggleHighlight,
                            ghost: ghost
                        }),
                        _react2.default.createElement(
                            _style2.default,
                            {
                                id: _SelectedItems2.default.__hash
                            },
                            _SelectedItems2.default
                        )
                    );
                }
            );
        }, _this.renderCloneItem = function (_ref5, index) {
            var id = _ref5.id,
                name = _ref5.name;

            var cloneId = id + '-clone';
            return _react2.default.createElement(
                _reactBeautifulDnd.Draggable,
                { draggableId: cloneId, index: index, key: cloneId },
                function (provided) {
                    return _react2.default.createElement(
                        'li',
                        (0, _extends3.default)({
                            id: cloneId
                        }, provided.draggableProps, provided.dragHandleProps, {
                            ref: provided.innerRef,
                            className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || 'selected-list-item')
                        }),
                        _react2.default.createElement(_SelectedItem2.default, {
                            id: cloneId,
                            index: CLONE_INDEX,
                            name: name,
                            highlighted: !!_this.state.highlighted.includes(id),
                            selected: true,
                            ghost: true
                        }),
                        _react2.default.createElement(
                            _style2.default,
                            {
                                id: _SelectedItems2.default.__hash
                            },
                            _SelectedItems2.default
                        )
                    );
                }
            );
        }, _this.getItemListWithClone = function () {
            var list = [];

            _this.props.items.forEach(function (item) {
                list.push(item);

                var isDraggedItem = _this.isMultiDrag(_this.state.draggingId) && _this.state.draggingId === item.id;

                if (isDraggedItem) {
                    list.push({ id: item.id, name: item.name, clone: true });
                }
            });

            return list;
        }, _this.render = function () {
            var itemList = _this.getItemListWithClone().map(function (item, i) {
                return item.clone ? _this.renderCloneItem(item, i) : _this.renderListItem(item, i);
            });

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(Subtitle, null),
                _react2.default.createElement(
                    _reactBeautifulDnd.DragDropContext,
                    {
                        onDragStart: _this.onDragStart,
                        onDragEnd: _this.onDragEnd
                    },
                    _react2.default.createElement(
                        _reactBeautifulDnd.Droppable,
                        { droppableId: 'selected-items-droppable' },
                        function (provided) {
                            return _react2.default.createElement(
                                ItemsList,
                                (0, _extends3.default)({
                                    innerRef: provided.innerRef
                                }, provided.droppableProps),
                                itemList,
                                provided.placeholder
                            );
                        }
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + 'deselect-all-button'
                    },
                    _react2.default.createElement(_Button2.default, {
                        kind: 'secondary',
                        size: 'small',
                        onClick: _this.onDeselectAll,
                        label: _d2I18n2.default.t('Deselect All')
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'jsx-' + _SelectedItems2.default.__hash + ' ' + 'deselect-highlighted-button'
                    },
                    _react2.default.createElement(_ArrowButton.ArrowButton, {
                        onClick: _this.onDeselectHighlighted,
                        iconType: 'arrowBack'
                    })
                ),
                _react2.default.createElement(
                    _style2.default,
                    {
                        id: _SelectedItems2.default.__hash
                    },
                    _SelectedItems2.default
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return SelectedItems;
}(_react.Component);

SelectedItems.propTypes = {
    items: _propTypes2.default.array.isRequired,
    onDeselect: _propTypes2.default.func.isRequired,
    onReorder: _propTypes2.default.func.isRequired
};

exports.default = SelectedItems;