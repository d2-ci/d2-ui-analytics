"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Item = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ItemIcon = _interopRequireDefault(require("./ItemIcon"));

var _DeselectIconButton = _interopRequireDefault(require("./DeselectIconButton"));

var _colors = require("../styles/colors");

var _SelectedItem = _interopRequireDefault(require("./styles/SelectedItem.style"));

var onClickWrapper = function onClickWrapper(_ref) {
  var id = _ref.id,
      index = _ref.index,
      onClick = _ref.onClick;
  return function (event) {
    return onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);
  };
};

var Item = function Item(_ref2) {
  var name = _ref2.name,
      highlighted = _ref2.highlighted,
      ghost = _ref2.ghost,
      onRemoveItem = _ref2.onRemoveItem,
      rest = (0, _objectWithoutProperties2.default)(_ref2, ["name", "highlighted", "ghost", "onRemoveItem"]);
  return _react.default.createElement("div", {
    onClick: onClickWrapper(rest),
    "data-test": "dimension-item-".concat(rest.id),
    className: "jsx-".concat(_SelectedItem.default.__hash) + " " + ((0, _classnames.default)('item', {
      'highlighted-item': highlighted,
      ghost: ghost,
      'selected-item': !highlighted
    }) || "")
  }, _react.default.createElement(_ItemIcon.default, {
    backgroundColor: highlighted ? _colors.colors.white : _colors.colors.accentSecondary
  }), _react.default.createElement("span", {
    className: "jsx-".concat(_SelectedItem.default.__hash) + " " + ((0, _classnames.default)('item-label', {
      'highlighted-text': highlighted
    }) || "")
  }, name), _react.default.createElement(_DeselectIconButton.default, {
    fill: highlighted ? _colors.colors.white : _colors.colors.accentSecondary,
    onClick: function onClick() {
      return onRemoveItem(rest.id);
    }
  }), _react.default.createElement(_style.default, {
    id: _SelectedItem.default.__hash
  }, _SelectedItem.default));
};

exports.Item = Item;
Item.defualtProps = {
  onRemoveItem: function onRemoveItem() {
    return null;
  },
  onClick: function onClick() {
    return null;
  }
};
Item.propTypes = {
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  index: _propTypes.default.number.isRequired,
  highlighted: _propTypes.default.bool.isRequired,
  ghost: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onRemoveItem: _propTypes.default.func
};
var _default = Item;
exports.default = _default;