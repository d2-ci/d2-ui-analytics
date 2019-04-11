"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Detail = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _Details = require("./styles/Details.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detail = function Detail(_ref) {
  var value = _ref.value,
      onDetailChange = _ref.onDetailChange,
      detailAlternatives = _ref.detailAlternatives;
  return _react.default.createElement("div", {
    style: _Details.styles.detailContainer
  }, _react.default.createElement(_InputLabel.default, {
    style: _Details.styles.titleText
  }, _d2I18n.default.t('Detail')), _react.default.createElement(_Select.default, {
    onChange: function onChange(event) {
      return onDetailChange(event.target.value);
    },
    value: value,
    disableUnderline: true,
    SelectDisplayProps: {
      style: _Details.styles.dropDown
    }
  }, Object.entries(detailAlternatives).map(function (item) {
    return _react.default.createElement(_MenuItem.default, {
      key: item[0],
      value: item[0]
    }, item[1]);
  })));
};

exports.Detail = Detail;
Detail.propTypes = {
  value: _propTypes.default.string.isRequired,
  onDetailChange: _propTypes.default.func.isRequired,
  detailAlternatives: _propTypes.default.object.isRequired
};
var _default = Detail;
exports.default = _default;