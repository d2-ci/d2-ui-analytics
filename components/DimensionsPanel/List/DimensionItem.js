'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DimensionItem = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _DimensionLabel = require('./DimensionLabel');

var _DimensionLabel2 = _interopRequireDefault(_DimensionLabel);

var _RecommendedIcon = require('./RecommendedIcon');

var _RecommendedIcon2 = _interopRequireDefault(_RecommendedIcon);

var _OptionsButton = require('./OptionsButton');

var _OptionsButton2 = _interopRequireDefault(_OptionsButton);

var _DynamicDimensionIcon = require('../../../assets/DynamicDimensionIcon');

var _DynamicDimensionIcon2 = _interopRequireDefault(_DynamicDimensionIcon);

var _fixedDimensions = require('../../../modules/fixedDimensions');

var _DimensionItem = require('./styles/DimensionItem.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DimensionItem = exports.DimensionItem = function (_Component) {
    (0, _inherits3.default)(DimensionItem, _Component);

    function DimensionItem() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DimensionItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionItem.__proto__ || (0, _getPrototypeOf2.default)(DimensionItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = { mouseOver: false }, _this.onOptionsClick = function (id) {
            return function (event) {
                return _this.props.onOptionsClick(event, id);
            };
        }, _this.onMouseOver = function () {
            _this.setState({ mouseOver: true });
        }, _this.onMouseExit = function () {
            _this.setState({ mouseOver: false });
        }, _this.getDimensionIcon = function () {
            var fixedDimension = _fixedDimensions.FIXED_DIMENSIONS[_this.props.id];

            if (fixedDimension) {
                var Icon = fixedDimension.icon;
                return _react2.default.createElement(Icon, { style: _DimensionItem.styles.fixedDimensionIcon });
            }

            return _react2.default.createElement(_DynamicDimensionIcon2.default, { style: _DimensionItem.styles.dynamicDimensionIcon });
        }, _this.getDimensionType = function () {
            var _this$props = _this.props,
                id = _this$props.id,
                name = _this$props.name,
                isDeactivated = _this$props.isDeactivated,
                onDragStart = _this$props.onDragStart;


            return _react2.default.createElement(
                'span',
                {
                    'data-dimensionid': id,
                    style: (0, _extends3.default)({}, _DimensionItem.styles.text, isDeactivated ? _DimensionItem.styles.textDeactivated : {}),
                    draggable: !isDeactivated,
                    onDragStart: onDragStart
                },
                _d2I18n2.default.t(name)
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DimensionItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                isDeactivated = _props.isDeactivated,
                isSelected = _props.isSelected,
                isRecommended = _props.isRecommended,
                onOptionsClick = _props.onOptionsClick;

            var Icon = this.getDimensionIcon();
            var Label = this.getDimensionType();
            var listItemStyle = isSelected && !isDeactivated ? (0, _extends3.default)({}, _DimensionItem.styles.listItem, _DimensionItem.styles.selectedListItem) : _DimensionItem.styles.listItem;

            return _react2.default.createElement(
                'li',
                {
                    style: listItemStyle,
                    onMouseOver: this.onMouseOver,
                    onMouseLeave: this.onMouseExit
                },
                _react2.default.createElement(
                    _DimensionLabel2.default,
                    this.props,
                    _react2.default.createElement(
                        'div',
                        { style: _DimensionItem.styles.iconWrapper },
                        Icon
                    ),
                    Label,
                    _react2.default.createElement(_RecommendedIcon2.default, {
                        id: id,
                        isSelected: isSelected,
                        isRecommended: isRecommended
                    })
                ),
                onOptionsClick ? _react2.default.createElement(
                    'div',
                    { style: _DimensionItem.styles.optionsWrapper },
                    this.state.mouseOver && !isDeactivated ? _react2.default.createElement(_OptionsButton2.default, {
                        style: _DimensionItem.styles.optionsButton,
                        onClick: this.onOptionsClick(id)
                    }) : null
                ) : null
            );
        }
    }]);
    return DimensionItem;
}(_react.Component);

DimensionItem.propTypes = {
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    isDeactivated: _propTypes2.default.bool,
    isSelected: _propTypes2.default.bool.isRequired, // XXX
    isRecommended: _propTypes2.default.bool,
    onOptionsClick: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func
};

DimensionItem.defaultProps = {
    isDeactivated: false,
    isRecommended: false,
    isSelected: false
};

exports.default = DimensionItem;