"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Filter = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Filter = require("./styles/Filter.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ref = null;

var onChangeWrapper = function onChangeWrapper(props, event) {
  event.target.value.length ? props.onChange(event.target.value) : props.onClear();
};

var onKeyDownWrapper = function onKeyDownWrapper(onClear, event, text) {
  if (event.key === 'Escape') {
    event.preventDefault();
    !text.length && ref ? ref.blur() : onClear();
  }
};

var Filter = function Filter(props) {
  return _react.default.createElement(_TextField.default, {
    autoFocus: props.autoFocus,
    style: props.style,
    placeholder: props.placeholder,
    value: props.text,
    onChange: function onChange(e) {
      return onChangeWrapper(props, e);
    },
    onKeyDown: function onKeyDown(e) {
      return onKeyDownWrapper(props.onClear, e, props.text);
    },
    inputRef: function inputRef(node) {
      return ref = node;
    },
    InputProps: {
      disableUnderline: props.disableUnderline,
      style: _Filter.styles.placeholder,
      startAdornment: _react.default.createElement(_InputAdornment.default, null, _react.default.createElement(_Search.default, {
        style: _Filter.styles.searchIcon
      })),
      endAdornment: props.text.length ? _react.default.createElement(_InputAdornment.default, null, _react.default.createElement(_IconButton.default, {
        style: _Filter.styles.iconButton,
        onClick: props.onClear,
        disableRipple: true
      }, _react.default.createElement(_Close.default, {
        style: _Filter.styles.closeIcon
      }))) : null
    }
  });
};

exports.Filter = Filter;
Filter.defaultProps = {
  style: {},
  autoFocus: false,
  disableUnderline: false
};
Filter.propTypes = {
  style: _propTypes.default.object,
  placeholder: _propTypes.default.string.isRequired,
  text: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onClear: _propTypes.default.func.isRequired,
  autoFocus: _propTypes.default.bool,
  disableUnderline: _propTypes.default.bool
};
var _default = Filter;
exports.default = _default;