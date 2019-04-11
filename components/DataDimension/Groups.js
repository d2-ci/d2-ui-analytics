"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _Detail = require("./Detail");

var _dataTypes = require("../../modules/dataTypes");

var _Groups = require("./styles/Groups.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Groups = function Groups(props) {
  var handleChange = function handleChange(event) {
    props.onGroupChange(event.target.value);
  };

  var renderDropDownItems = function renderDropDownItems() {
    var defaultGroup = _dataTypes.dataTypes[props.dataType].defaultGroup;
    var optionItems = props.groups;

    if (defaultGroup) {
      optionItems = [defaultGroup].concat(_toConsumableArray(optionItems));
    }

    return optionItems.map(function (item) {
      return _react.default.createElement(_MenuItem.default, {
        key: item.id,
        value: item.id
      }, item.name);
    });
  };

  var groupDetail = _dataTypes.dataTypes[props.dataType].groupDetail;
  var havePlaceholder = Boolean(!props.groupId && _dataTypes.dataTypes[props.dataType].placeholder);
  return _react.default.createElement("div", {
    style: _Groups.styles.container
  }, _react.default.createElement("div", {
    style: _Groups.styles.groupContainer
  }, _react.default.createElement(_InputLabel.default, {
    style: _Groups.styles.titleText
  }, _dataTypes.dataTypes[props.dataType].groupLabel), _react.default.createElement(_Select.default, {
    value: props.groupId,
    onChange: handleChange,
    renderValue: havePlaceholder ? _dataTypes.dataTypes[props.dataType].placeholder : null,
    displayEmpty: havePlaceholder,
    disableUnderline: true,
    SelectDisplayProps: havePlaceholder ? {
      style: _Groups.styles.placeholder
    } : {
      style: _Groups.styles.dropDown
    }
  }, renderDropDownItems())), groupDetail && _react.default.createElement(_Detail.Detail, {
    value: props.detailValue,
    onDetailChange: props.onDetailChange,
    detailAlternatives: groupDetail.alternatives
  }));
};

Groups.propTypes = {
  dataType: _propTypes.default.string.isRequired,
  groups: _propTypes.default.array.isRequired,
  groupId: _propTypes.default.string.isRequired,
  onGroupChange: _propTypes.default.func.isRequired,
  onDetailChange: _propTypes.default.func.isRequired,
  detailValue: _propTypes.default.string.isRequired
};
var _default = Groups;
exports.default = _default;