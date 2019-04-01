'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataTypes = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('@material-ui/core/Select');

var _Select2 = _interopRequireDefault(_Select);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _dataTypes = require('../../modules/dataTypes');

var _DataTypesSelector = require('./styles/DataTypesSelector.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataTypes = exports.DataTypes = function DataTypes(_ref) {
    var currentDataType = _ref.currentDataType,
        onDataTypeChange = _ref.onDataTypeChange;
    return _react2.default.createElement(
        'div',
        { style: _DataTypesSelector.styles.container },
        _react2.default.createElement(
            _InputLabel2.default,
            { style: _DataTypesSelector.styles.titleText },
            _d2I18n2.default.t('Data Type')
        ),
        _react2.default.createElement(
            _Select2.default,
            {
                value: currentDataType,
                onChange: function onChange(event) {
                    return onDataTypeChange(event.target.value);
                },
                disableUnderline: true,
                SelectDisplayProps: { style: _DataTypesSelector.styles.dropDown }
            },
            (0, _values2.default)(_dataTypes.dataTypes).map(function (type) {
                return _react2.default.createElement(
                    _MenuItem2.default,
                    {
                        style: _DataTypesSelector.styles.dropDownItem,
                        key: type.id,
                        value: type.id
                    },
                    type.name
                );
            })
        )
    );
};

DataTypes.propTypes = {
    currentDataType: _propTypes2.default.string.isRequired,
    onDataTypeChange: _propTypes2.default.func.isRequired
};

exports.default = DataTypes;