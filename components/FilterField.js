'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilterField = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Filter = require('./Filter/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _FilterField = require('./styles/FilterField.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterField = exports.FilterField = function FilterField(_ref) {
    var text = _ref.text,
        onFilterTextChange = _ref.onFilterTextChange,
        onClearFilter = _ref.onClearFilter;
    return _react2.default.createElement(
        'div',
        { style: _FilterField.styles.container },
        _react2.default.createElement(_Filter2.default, {
            style: _FilterField.styles.textField,
            placeholder: _d2I18n2.default.t('Search'),
            text: text,
            onChange: onFilterTextChange,
            onClear: onClearFilter,
            disableUnderline: true
        })
    );
};

FilterField.propTypes = {
    text: _propTypes2.default.string.isRequired,
    onFilterTextChange: _propTypes2.default.func.isRequired,
    onClearFilter: _propTypes2.default.func.isRequired
};

exports.default = FilterField;