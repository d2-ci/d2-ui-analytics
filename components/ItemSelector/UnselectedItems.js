"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UnselectedItems = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button/Button"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _UnselectedItem = _interopRequireDefault(require("./widgets/UnselectedItem"));

var _ArrowButton = require("./widgets/ArrowButton");

var _toggler = require("./modules/toggler");

var _UnselectedItems = _interopRequireDefault(require("./styles/UnselectedItems.style"));

var UnselectedItems =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UnselectedItems, _Component);

  function UnselectedItems(props) {
    var _this;

    (0, _classCallCheck2.default)(this, UnselectedItems);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnselectedItems).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      highlighted: [],
      lastClickedIndex: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelectClick", function () {
      _this.props.onSelect(_this.state.highlighted);

      _this.setState({
        highlighted: []
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelectAllClick", function () {
      _this.props.onSelect(_this.props.items.map(function (i) {
        return i.id;
      }));

      _this.setState({
        highlighted: []
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDoubleClickItem", function (id) {
      var highlighted = _this.state.highlighted.filter(function (dataDimId) {
        return dataDimId !== id;
      });

      _this.setState({
        highlighted: highlighted
      });

      _this.props.onSelect([id]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filterTextContains", function (displayName) {
      return displayName.toLowerCase().includes(_this.props.filterText.toLowerCase());
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filterItems", function (item, index) {
      return _this.filterTextContains(item.name) ? _this.renderListItem(item, index) : null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "toggleHighlight", function (isCtrlPressed, isShiftPressed, index, id) {
      var newState = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
        return item.id;
      }));

      _this.setState({
        highlighted: newState.ids,
        lastClickedIndex: newState.lastClickedIndex
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderListItem", function (dataDim, index) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "requestMoreItems", (0, _throttle.default)(function () {
      var node = _this.scrolElRef.current;

      if (node) {
        var bottom = node.scrollHeight - node.scrollTop === node.clientHeight;

        if (bottom) {
          _this.props.requestMoreItems();
        }
      }
    }, 1000));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
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