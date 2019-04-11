"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DynamicDimension = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _ItemSelector = _interopRequireDefault(require("../ItemSelector/ItemSelector"));

var _FilterField = _interopRequireDefault(require("../FilterField"));

var _dimensions = require("../../api/dimensions");

var _DynamicDimension = require("./styles/DynamicDimension.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DynamicDimension =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicDimension, _Component);

  function DynamicDimension() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DynamicDimension);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DynamicDimension)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      filterText: '',
      nextPage: null,
      items: [],
      unselectedIds: [],
      selectedIds: []
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var items;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _dimensions.apiFetchItemsByDimension)(_this.props.d2, _this.props.dialogId);

            case 2:
              items = _context.sent;

              _this.setState({
                items: items
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onClearFilter", function () {
      _this.setState({
        filterText: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFilterTextChange", function (filterText) {
      var filteredItems = _this.state.items.map(function (item) {
        return item.name.toLowerCase().includes(filterText.toLowerCase()) && item.id;
      });

      _this.setState({
        filterText: filterText,
        unselectedIds: filteredItems
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectItemsByDimensions", function (selectedIds) {
      var unselectedIds = _this.state.unselectedIds.filter(function (id) {
        return !selectedIds.includes(id);
      });

      _this.setState({
        unselectedIds: unselectedIds
      });

      var itemsToAdd = _this.state.items.filter(function (di) {
        return selectedIds.includes(di.id);
      });

      _this.props.onSelect({
        dimensionType: _this.props.dialogId,
        value: [].concat(_toConsumableArray(_this.props.selectedItems.filter(function (item) {
          return !selectedIds.include(item.id);
        })), _toConsumableArray(itemsToAdd))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deselectItemsByDimensions", function (ids) {
      var unselectedIds = _toConsumableArray(new Set([].concat(_toConsumableArray(_this.state.unselectedIds), _toConsumableArray(ids))));

      _this.setState({
        unselectedIds: unselectedIds
      });

      _this.props.onDeselect({
        dimensionType: _this.props.dialogId,
        value: ids
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getUnselectedItems", function () {
      return _this.state.items.filter(function (item) {
        return !_this.props.selectedItems.find(function (i) {
          return i.id === item.id;
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setUiItems", function (items) {
      return _this.props.onReorder({
        dimensionType: _this.props.dialogId,
        value: items
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var filterZone = function filterZone() {
        return _react.default.createElement(_FilterField.default, {
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
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DialogTitle.default, null, _this.props.dialogTitle), _react.default.createElement(_DialogContent.default, {
        style: _DynamicDimension.styles.dialogContent
      }, _react.default.createElement(_ItemSelector.default, {
        itemClassName: "dynamic-dimension",
        unselected: unselected,
        selected: selected
      }, filterZone())));
    });

    return _this;
  }

  return DynamicDimension;
}(_react.Component);

exports.DynamicDimension = DynamicDimension;
DynamicDimension.propTypes = {
  d2: _propTypes.default.object.isRequired,
  dialogId: _propTypes.default.string.isRequired,
  dialogTitle: _propTypes.default.string.isRequired,
  selectedItems: _propTypes.default.array.isRequired,
  onSelect: _propTypes.default.func.isRequired,
  onDeselect: _propTypes.default.func.isRequired,
  onReorder: _propTypes.default.func.isRequired
};
DynamicDimension.defaultProps = {
  selectedItems: [],
  onSelect: Function.prototype,
  onDeselect: Function.prototype,
  onReorder: Function.prototype
};
var _default = DynamicDimension;
exports.default = _default;