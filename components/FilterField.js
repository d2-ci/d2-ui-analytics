"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FilterField = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Filter = _interopRequireDefault(require("./Filter/Filter"));

var _FilterField = require("./styles/FilterField.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterField = function FilterField(_ref) {
  var text = _ref.text,
      onFilterTextChange = _ref.onFilterTextChange,
      onClearFilter = _ref.onClearFilter;
  return _react.default.createElement("div", {
    style: _FilterField.styles.container
  }, _react.default.createElement(_Filter.default, {
    style: _FilterField.styles.textField,
    placeholder: _d2I18n.default.t('Search'),
    text: text,
    onChange: onFilterTextChange,
    onClear: onClearFilter,
    disableUnderline: true
  }));
};

exports.FilterField = FilterField;
FilterField.propTypes = {
  text: _propTypes.default.string.isRequired,
  onFilterTextChange: _propTypes.default.func.isRequired,
  onClearFilter: _propTypes.default.func.isRequired
};
var _default = FilterField;
exports.default = _default;