'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RecommendedIcon = undefined;

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

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _RecommendedIcon = require('./styles/RecommendedIcon.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecommendedIcon = exports.RecommendedIcon = function (_Component) {
    (0, _inherits3.default)(RecommendedIcon, _Component);

    function RecommendedIcon() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RecommendedIcon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RecommendedIcon.__proto__ || (0, _getPrototypeOf2.default)(RecommendedIcon)).call.apply(_ref, [this].concat(args))), _this), _this.state = { anchorEl: null }, _this.onMouseOver = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        }, _this.onMouseExit = function () {
            _this.setState({ anchorEl: null });
        }, _this.showTooltip = function () {
            return _react2.default.createElement(
                _Popper2.default,
                {
                    anchorEl: _this.state.anchorEl,
                    open: Boolean(_this.state.anchorEl),
                    placement: 'bottom'
                },
                _react2.default.createElement(
                    _Paper2.default,
                    { style: _RecommendedIcon.styles.toolTip },
                    _d2I18n2.default.t('Dimension recommended with selected data')
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RecommendedIcon, [{
        key: 'render',
        value: function render() {
            var TooltipOnHover = Boolean(this.state.anchorEl) ? this.showTooltip() : null;

            return this.props.isRecommended ? _react2.default.createElement(
                'div',
                { style: _RecommendedIcon.styles.recommendedWrapper },
                _react2.default.createElement(
                    'div',
                    {
                        style: _RecommendedIcon.styles.recommendedIcon,
                        onMouseOver: this.onMouseOver,
                        onMouseLeave: this.onMouseExit
                    },
                    TooltipOnHover
                )
            ) : null;
        }
    }]);
    return RecommendedIcon;
}(_react.Component);

RecommendedIcon.propTypes = {
    id: _propTypes2.default.string.isRequired,
    isSelected: _propTypes2.default.bool.isRequired,
    isRecommended: _propTypes2.default.bool.isRequired
};

exports.default = RecommendedIcon;