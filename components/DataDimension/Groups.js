'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Detail = require('./Detail');

var _dataTypes = require('../../modules/dataTypes');

var _Groups = require('./styles/Groups.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Groups = function Groups(props) {
    var handleChange = function handleChange(event) {
        props.onGroupChange(event.target.value);
    };

    var renderDropDownItems = function renderDropDownItems() {
        var defaultGroup = _dataTypes.dataTypes[props.dataType].defaultGroup;
        var optionItems = props.groups;

        if (defaultGroup) {
            optionItems = [defaultGroup].concat((0, _toConsumableArray3.default)(optionItems));
        }

        return optionItems.map(function (item) {
            return _react2.default.createElement(
                _MenuItem2.default,
                { key: item.id, value: item.id },
                item.name
            );
        });
    };

    var groupDetail = _dataTypes.dataTypes[props.dataType].groupDetail;

    var havePlaceholder = Boolean(!props.groupId && _dataTypes.dataTypes[props.dataType].placeholder);

    return _react2.default.createElement(
        'div',
        { style: _Groups.styles.container },
        _react2.default.createElement(
            'div',
            { style: _Groups.styles.groupContainer },
            _react2.default.createElement(
                _InputLabel2.default,
                { style: _Groups.styles.titleText },
                _dataTypes.dataTypes[props.dataType].groupLabel
            ),
            _react2.default.createElement(
                _Select2.default,
                {
                    value: props.groupId,
                    onChange: handleChange,
                    renderValue: havePlaceholder ? _dataTypes.dataTypes[props.dataType].placeholder : null,
                    displayEmpty: havePlaceholder,
                    disableUnderline: true,
                    SelectDisplayProps: havePlaceholder ? { style: _Groups.styles.placeholder } : { style: _Groups.styles.dropDown }
                },
                renderDropDownItems()
            )
        ),
        groupDetail && _react2.default.createElement(_Detail.Detail, {
            value: props.detailValue,
            onDetailChange: props.onDetailChange,
            detailAlternatives: groupDetail.alternatives
        })
    );
};

Groups.propTypes = {
    dataType: _propTypes2.default.string.isRequired,
    groups: _propTypes2.default.array.isRequired,
    groupId: _propTypes2.default.string.isRequired,
    onGroupChange: _propTypes2.default.func.isRequired,
    onDetailChange: _propTypes2.default.func.isRequired,
    detailValue: _propTypes2.default.string.isRequired
};

exports.default = Groups;