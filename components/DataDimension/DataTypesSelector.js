"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataTypes = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _dataTypes = require("../../modules/dataTypes");

var _DataTypesSelector = require("./styles/DataTypesSelector.style");

var DataTypes = function DataTypes(_ref) {
  var currentDataType = _ref.currentDataType,
      onDataTypeChange = _ref.onDataTypeChange;
  return _react.default.createElement("div", {
    style: _DataTypesSelector.styles.container
  }, _react.default.createElement(_InputLabel.default, {
    style: _DataTypesSelector.styles.titleText
  }, _d2I18n.default.t('Data Type')), _react.default.createElement(_Select.default, {
    value: currentDataType,
    onChange: function onChange(event) {
      return onDataTypeChange(event.target.value);
    },
    disableUnderline: true,
    SelectDisplayProps: {
      style: _DataTypesSelector.styles.dropDown
    }
  }, Object.values(_dataTypes.dataTypes).map(function (type) {
    return _react.default.createElement(_MenuItem.default, {
      style: _DataTypesSelector.styles.dropDownItem,
      key: type.id,
      value: type.id
    }, type.name);
  })));
};

exports.DataTypes = DataTypes;
DataTypes.propTypes = {
  currentDataType: _propTypes.default.string.isRequired,
  onDataTypeChange: _propTypes.default.func.isRequired
};
var _default = DataTypes;
exports.default = _default;