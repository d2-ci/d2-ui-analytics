'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Filter = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Filter = require('./styles/Filter.style');

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

var Filter = exports.Filter = function Filter(props) {
    return _react2.default.createElement(_TextField2.default, {
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
            startAdornment: _react2.default.createElement(
                _InputAdornment2.default,
                null,
                _react2.default.createElement(_Search2.default, { style: _Filter.styles.searchIcon })
            ),
            endAdornment: props.text.length ? _react2.default.createElement(
                _InputAdornment2.default,
                null,
                _react2.default.createElement(
                    _IconButton2.default,
                    {
                        style: _Filter.styles.iconButton,
                        onClick: props.onClear,
                        disableRipple: true
                    },
                    _react2.default.createElement(_Close2.default, { style: _Filter.styles.closeIcon })
                )
            ) : null
        }
    });
};

Filter.defaultProps = {
    style: {},
    autoFocus: false,
    disableUnderline: false
};

Filter.propTypes = {
    style: _propTypes2.default.object,
    placeholder: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    onClear: _propTypes2.default.func.isRequired,
    autoFocus: _propTypes2.default.bool,
    disableUnderline: _propTypes2.default.bool
};

exports.default = Filter;