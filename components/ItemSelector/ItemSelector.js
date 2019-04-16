"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _UnselectedItems = _interopRequireDefault(require("./UnselectedItems"));

var _SelectedItems = _interopRequireDefault(require("./SelectedItems"));

var _ItemSelector = _interopRequireDefault(require("./styles/ItemSelector.style"));

var ItemSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ItemSelector, _Component);

  function ItemSelector() {
    (0, _classCallCheck2.default)(this, ItemSelector);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ItemSelector).apply(this, arguments));
  }

  (0, _createClass2.default)(ItemSelector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          unselected = _this$props.unselected,
          selected = _this$props.selected,
          filterZone = _this$props.children;
      return _react.default.createElement("div", {
        className: "jsx-".concat(_ItemSelector.default.__hash) + " " + "item-selector-container"
      }, _react.default.createElement("div", {
        className: "jsx-".concat(_ItemSelector.default.__hash) + " " + ((0, _classnames.default)('section', 'unselected') || "")
      }, filterZone, _react.default.createElement(_UnselectedItems.default, unselected)), _react.default.createElement("div", {
        className: "jsx-".concat(_ItemSelector.default.__hash) + " " + ((0, _classnames.default)('section', 'selected') || "")
      }, _react.default.createElement(_SelectedItems.default, selected)), _react.default.createElement(_style.default, {
        id: _ItemSelector.default.__hash
      }, _ItemSelector.default));
    }
  }]);
  return ItemSelector;
}(_react.Component);

ItemSelector.propTypes = {
  unselected: _propTypes.default.shape({
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      id: _propTypes.default.string.isRequired,
      name: _propTypes.default.string.isRequired
    })).isRequired,
    onSelect: _propTypes.default.func.isRequired,
    filterText: _propTypes.default.string,
    requestMoreItems: _propTypes.default.func
  }),
  selected: _propTypes.default.shape({
    items: _propTypes.default.arrayOf(_propTypes.default.shape({
      id: _propTypes.default.string.isRequired,
      name: _propTypes.default.string.isRequired
    })).isRequired,
    dialogId: _propTypes.default.string,
    onDeselect: _propTypes.default.func.isRequired,
    onReorder: _propTypes.default.func.isRequired
  })
};
var _default = ItemSelector;
exports.default = _default;