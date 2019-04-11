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

var _colors = require("../styles/colors");

var _UnselectedItem = _interopRequireDefault(require("./styles/UnselectedItem.style"));

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
      rest = (0, _objectWithoutProperties2.default)(_ref2, ["name", "highlighted"]);
  return _react.default.createElement("div", {
    onClick: onClickWrapper(rest),
    "data-test": "dimension-item-".concat(rest.id),
    className: "jsx-".concat(_UnselectedItem.default.__hash) + " " + ((0, _classnames.default)('item', {
      'highlighted-item': highlighted,
      'unselected-item': !highlighted
    }) || "")
  }, _react.default.createElement(_ItemIcon.default, {
    backgroundColor: _colors.colors.grey
  }), _react.default.createElement("span", {
    className: "jsx-".concat(_UnselectedItem.default.__hash) + " " + ((0, _classnames.default)('item-label', {
      'highlighted-text': highlighted
    }) || "")
  }, name), _react.default.createElement(_style.default, {
    id: _UnselectedItem.default.__hash
  }, _UnselectedItem.default));
};

exports.Item = Item;
Item.defualtProps = {
  onClick: function onClick() {
    return null;
  }
};
Item.propTypes = {
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  index: _propTypes.default.number.isRequired,
  highlighted: _propTypes.default.bool.isRequired,
  onClick: _propTypes.default.func
};
var _default = Item;
exports.default = _default;