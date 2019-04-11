"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UnselectedItems = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button/Button"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _UnselectedItem = _interopRequireDefault(require("./widgets/UnselectedItem"));

var _ArrowButton = require("./widgets/ArrowButton");

var _toggler = require("./modules/toggler");

var _UnselectedItems = _interopRequireDefault(require("./styles/UnselectedItems.style"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UnselectedItems =
/*#__PURE__*/
function (_Component) {
  _inherits(UnselectedItems, _Component);

  function UnselectedItems(props) {
    var _this;

    _classCallCheck(this, UnselectedItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnselectedItems).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      highlighted: [],
      lastClickedIndex: 0
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectClick", function () {
      _this.props.onSelect(_this.state.highlighted);

      _this.setState({
        highlighted: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectAllClick", function () {
      _this.props.onSelect(_this.props.items.map(function (i) {
        return i.id;
      }));

      _this.setState({
        highlighted: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDoubleClickItem", function (id) {
      var highlighted = _this.state.highlighted.filter(function (dataDimId) {
        return dataDimId !== id;
      });

      _this.setState({
        highlighted: highlighted
      });

      _this.props.onSelect([id]);
    });

    _defineProperty(_assertThisInitialized(_this), "filterTextContains", function (displayName) {
      return displayName.toLowerCase().includes(_this.props.filterText.toLowerCase());
    });

    _defineProperty(_assertThisInitialized(_this), "filterItems", function (item, index) {
      return _this.filterTextContains(item.name) ? _this.renderListItem(item, index) : null;
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

    _defineProperty(_assertThisInitialized(_this), "renderListItem", function (dataDim, index) {
      return _react.default.createElement("li", {
        key: dataDim.id,
        onDoubleClick: function onDoubleClick() {
          return _this.onDoubleClickItem(dataDim.id);
        },
        className: "jsx-".concat(_UnselectedItems.default.__hash) + " " + "unselected-list-item"
      }, _react.default.createElement(_UnselectedItem.default, {
        id: dataDim.id,
        index: index,
        name: dataDim.name,
        highlighted: !!_this.state.highlighted.includes(dataDim.id),
        onClick: _this.toggleHighlight
      }), _react.default.createElement(_style.default, {
        id: _UnselectedItems.default.__hash
      }, _UnselectedItems.default));
    });

    _defineProperty(_assertThisInitialized(_this), "requestMoreItems", (0, _throttle.default)(function () {
      var node = _this.scrolElRef.current;

      if (node) {
        var bottom = node.scrollHeight - node.scrollTop === node.clientHeight;

        if (bottom) {
          _this.props.requestMoreItems();
        }
      }
    }, 1000));

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var listItems = _this.props.items.map(function (item, index) {
        return _this.props.filterText.length ? _this.filterItems(item, index) : _this.renderListItem(item, index);
      });

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
        ref: _this.scrolElRef,
        onScroll: _this.requestMoreItems,
        className: "jsx-".concat(_UnselectedItems.default.__hash) + " " + "unselected-list-container"
      }, _react.default.createElement("ul", {
        className: "jsx-".concat(_UnselectedItems.default.__hash) + " " + "unselected-list"
      }, listItems)), _react.default.createElement("div", {
        className: "jsx-".concat(_UnselectedItems.default.__hash) + " " + "select-all-button"
      }, _react.default.createElement(_Button.default, {
        onClick: _this.onSelectAllClick
      }, _d2I18n.default.t('Select all'))), _react.default.createElement("div", {
        className: "jsx-".concat(_UnselectedItems.default.__hash) + " " + "select-highlighted-button"
      }, _react.default.createElement(_ArrowButton.ArrowButton, {
        onClick: _this.onSelectClick,
        iconType: 'arrowForward'
      })), _react.default.createElement(_style.default, {
        id: _UnselectedItems.default.__hash
      }, _UnselectedItems.default));
    });

    _this.scrolElRef = _react.default.createRef();
    return _this;
  }

  return UnselectedItems;
}(_react.Component);

exports.UnselectedItems = UnselectedItems;
UnselectedItems.propTypes = {
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired
  })).isRequired,
  onSelect: _propTypes.default.func.isRequired,
  filterText: _propTypes.default.string,
  requestMoreItems: _propTypes.default.func
};
UnselectedItems.defaultProps = {
  requestMoreItems: function requestMoreItems() {
    return null;
  },
  filterText: ''
};
var _default = UnselectedItems;
exports.default = _default;