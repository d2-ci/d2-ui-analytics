"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _UnselectedItems = _interopRequireDefault(require("./UnselectedItems"));

var _SelectedItems = _interopRequireDefault(require("./SelectedItems"));

var _ItemSelector = _interopRequireDefault(require("./styles/ItemSelector.style"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ItemSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(ItemSelector, _Component);

  function ItemSelector() {
    _classCallCheck(this, ItemSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemSelector).apply(this, arguments));
  }

  _createClass(ItemSelector, [{
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