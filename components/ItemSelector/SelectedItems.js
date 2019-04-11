"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectedItems = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button/Button"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _lodash = require("lodash");

var _SelectedItem = _interopRequireDefault(require("./widgets/SelectedItem"));

var _ArrowButton = require("./widgets/ArrowButton");

var _toggler = require("./modules/toggler");

var _SelectedItems = _interopRequireDefault(require("./styles/SelectedItems.style"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Subtitle = function Subtitle() {
  return _react.default.createElement("div", {
    className: "jsx-".concat(_SelectedItems.default.__hash) + " " + "subtitle-container"
  }, _react.default.createElement("span", {
    className: "jsx-".concat(_SelectedItems.default.__hash) + " " + "subtitle-text"
  }, _d2I18n.default.t('Selected Data')), _react.default.createElement(_style.default, {
    id: _SelectedItems.default.__hash
  }, _SelectedItems.default));
};

var ItemsList = function ItemsList(_ref) {
  var innerRef = _ref.innerRef,
      children = _ref.children;
  return _react.default.createElement("ul", {
    ref: innerRef,
    className: "jsx-".concat(_SelectedItems.default.__hash) + " " + "selected-list"
  }, children, _react.default.createElement(_style.default, {
    id: _SelectedItems.default.__hash
  }, _SelectedItems.default));
};

var CLONE_INDEX = 9999; // a high number to not influence the actual item list

var _ref5 =
/*#__PURE__*/
_react.default.createElement(Subtitle, null);

var SelectedItems =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectedItems, _Component);

  function SelectedItems() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectedItems);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectedItems)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      highlighted: [],
      lastClickedIndex: 0,
      draggingId: null
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselectHighlighted", function () {
      _this.props.onDeselect(_this.state.highlighted);

      _this.setState({
        highlighted: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselectOne", function (id) {
      var highlighted = _this.state.highlighted.filter(function (highlightedId) {
        return highlightedId !== id;
      });

      _this.props.onDeselect([id]);

      _this.setState({
        highlighted: highlighted
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselectAll", function () {
      _this.props.onDeselect(_this.props.items.map(function (item) {
        return item.id;
      }));

      _this.setState({
        highlighted: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleHighlight", function (isCtrlPressed, isShiftPressed, index, id) {
      var newState = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
        return item.id;
      }));

      _this.setState({
        highlighted: newState.ids,
        lastClickedIndex: newState.lastClickedIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isMultiDrag", function (draggableId) {
      return _this.state.highlighted.includes(draggableId) && _this.state.highlighted.length > 1;
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (start) {
      var id = start.draggableId;

      var selected = _this.state.highlighted.find(function (itemId) {
        return itemId === id;
      }); // if dragging an item that is not highlighted, unhighlight all items


      if (!selected) {
        _this.setState({
          highlighted: []
        });
      }

      _this.setState({
        draggingId: start.draggableId
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reorderList", function (destination, source, draggableId) {
      var list = Array.from(_this.props.items.map(function (item) {
        return item.id;
      }));

      if (_this.isMultiDrag(draggableId)) {
        var indexedItemsToMove = (0, _lodash.sortBy)(_this.state.highlighted.map(function (item) {
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
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (_ref2) {
      var destination = _ref2.destination,
          source = _ref2.source,
          draggableId = _ref2.draggableId;

      _this.setState({
        draggingId: null
      });

      if (destination === null) {
        return;
      }

      if (destination.draggableId === source.draggableId && destination.index === source.index) {
        return;
      }

      var newList = _this.reorderList(destination, source, draggableId);

      _this.props.onReorder(newList);
    });

    _defineProperty(_assertThisInitialized(_this), "renderListItem", function (_ref3, index) {
      var id = _ref3.id,
          name = _ref3.name;
      return _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: id,
        index: index,
        key: id
      }, function (provided, snapshot) {
        var isDraggedItem = snapshot.isDragging && _this.state.highlighted.length > 1 && _this.state.highlighted.includes(_this.state.draggingId);

        var ghost = _this.state.highlighted.includes(id) && Boolean(_this.state.draggingId) && _this.state.draggingId !== id;
        var itemText = isDraggedItem ? "".concat(_this.state.highlighted.length, " items") : name;
        return _react.default.createElement("li", _extends({
          id: id,
          onDoubleClick: function onDoubleClick() {
            return _this.onDeselectOne(id);
          }
        }, provided.draggableProps, provided.dragHandleProps, {
          ref: provided.innerRef,
          className: "jsx-".concat(_SelectedItems.default.__hash) + " " + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || "selected-list-item")
        }), _react.default.createElement(_SelectedItem.default, {
          id: id,
          index: index,
          name: itemText,
          highlighted: !!_this.state.highlighted.includes(id),
          onRemoveItem: _this.onDeselectOne,
          onClick: _this.toggleHighlight,
          ghost: ghost
        }), _react.default.createElement(_style.default, {
          id: _SelectedItems.default.__hash
        }, _SelectedItems.default));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCloneItem", function (_ref4, index) {
      var id = _ref4.id,
          name = _ref4.name;
      var cloneId = "".concat(id, "-clone");
      return _react.default.createElement(_reactBeautifulDnd.Draggable, {
        draggableId: cloneId,
        index: index,
        key: cloneId
      }, function (provided) {
        return _react.default.createElement("li", _extends({
          id: cloneId
        }, provided.draggableProps, provided.dragHandleProps, {
          ref: provided.innerRef,
          className: "jsx-".concat(_SelectedItems.default.__hash) + " " + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || "selected-list-item")
        }), _react.default.createElement(_SelectedItem.default, {
          id: cloneId,
          index: CLONE_INDEX,
          name: name,
          highlighted: !!_this.state.highlighted.includes(id),
          selected: true,
          ghost: true
        }), _react.default.createElement(_style.default, {
          id: _SelectedItems.default.__hash
        }, _SelectedItems.default));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getItemListWithClone", function () {
      var list = [];

      _this.props.items.forEach(function (item) {
        list.push(item);
        var isDraggedItem = _this.isMultiDrag(_this.state.draggingId) && _this.state.draggingId === item.id;

        if (isDraggedItem) {
          list.push({
            id: item.id,
            name: item.name,
            clone: true
          });
        }
      });

      return list;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var itemList = _this.getItemListWithClone().map(function (item, i) {
        return item.clone ? _this.renderCloneItem(item, i) : _this.renderListItem(item, i);
      });

      return _react.default.createElement(_react.Fragment, null, _ref5, _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
        onDragStart: _this.onDragStart,
        onDragEnd: _this.onDragEnd
      }, _react.default.createElement(_reactBeautifulDnd.Droppable, {
        droppableId: "selected-items-droppable"
      }, function (provided) {
        return _react.default.createElement(ItemsList, _extends({
          innerRef: provided.innerRef
        }, provided.droppableProps), itemList, provided.placeholder);
      })), _react.default.createElement("div", {
        className: "jsx-".concat(_SelectedItems.default.__hash) + " " + "deselect-all-button"
      }, _react.default.createElement(_Button.default, {
        onClick: _this.onDeselectAll
      }, _d2I18n.default.t('Deselect All'))), _react.default.createElement("div", {
        className: "jsx-".concat(_SelectedItems.default.__hash) + " " + "deselect-highlighted-button"
      }, _react.default.createElement(_ArrowButton.ArrowButton, {
        onClick: _this.onDeselectHighlighted,
        iconType: 'arrowBack'
      })), _react.default.createElement(_style.default, {
        id: _SelectedItems.default.__hash
      }, _SelectedItems.default));
    });

    return _this;
  }

  return SelectedItems;
}(_react.Component);

exports.SelectedItems = SelectedItems;
SelectedItems.propTypes = {
  items: _propTypes.default.array.isRequired,
  onDeselect: _propTypes.default.func.isRequired,
  onReorder: _propTypes.default.func.isRequired
};
var _default = SelectedItems;
exports.default = _default;