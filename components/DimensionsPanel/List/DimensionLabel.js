'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DimensionLabel = undefined;

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

var _DimensionLabel = require('./styles/DimensionLabel.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DimensionLabel = exports.DimensionLabel = function (_Component) {
    (0, _inherits3.default)(DimensionLabel, _Component);

    function DimensionLabel() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DimensionLabel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionLabel.__proto__ || (0, _getPrototypeOf2.default)(DimensionLabel)).call.apply(_ref, [this].concat(args))), _this), _this.onLabelClick = function () {
            if (!_this.props.isDeactivated) {
                _this.props.onClick(_this.props.id);
            }
        }, _this.onKeyPress = function (event) {
            if (event.key === 'Enter' && event.ctrlKey === false) {
                _this.onLabelClick();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DimensionLabel, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    'data-test': 'dimension-id-' + this.props.id,
                    className: 'label',
                    onClick: this.onLabelClick,
                    onKeyPress: this.onKeyPress,
                    tabIndex: 0,
                    style: _DimensionLabel.styles.label
                },
                this.props.children
            );
        }
    }]);
    return DimensionLabel;
}(_react.Component);

DimensionLabel.propTypes = {
    id: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    isDeactivated: _propTypes2.default.bool.isRequired,
    isSelected: _propTypes2.default.bool.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    children: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired
};
exports.default = DimensionLabel;