'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Detail = undefined;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require('@material-ui/core/Select');

var _Select2 = _interopRequireDefault(_Select);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _Details = require('./styles/Details.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detail = exports.Detail = function Detail(_ref) {
    var value = _ref.value,
        onDetailChange = _ref.onDetailChange,
        detailAlternatives = _ref.detailAlternatives;
    return _react2.default.createElement(
        'div',
        { style: _Details.styles.detailContainer },
        _react2.default.createElement(
            _InputLabel2.default,
            { style: _Details.styles.titleText },
            _d2I18n2.default.t('Detail')
        ),
        _react2.default.createElement(
            _Select2.default,
            {
                onChange: function onChange(event) {
                    return onDetailChange(event.target.value);
                },
                value: value,
                disableUnderline: true,
                SelectDisplayProps: { style: _Details.styles.dropDown }
            },
            (0, _entries2.default)(detailAlternatives).map(function (item) {
                return _react2.default.createElement(
                    _MenuItem2.default,
                    { key: item[0], value: item[0] },
                    item[1]
                );
            })
        )
    );
};

Detail.propTypes = {
    value: _propTypes2.default.string.isRequired,
    onDetailChange: _propTypes2.default.func.isRequired,
    detailAlternatives: _propTypes2.default.object.isRequired
};

exports.default = Detail;