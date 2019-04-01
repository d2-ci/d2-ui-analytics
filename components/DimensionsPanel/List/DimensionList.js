'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DimensionList = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

var _DimensionItem = require('./DimensionItem');

var _DimensionItem2 = _interopRequireDefault(_DimensionItem);

var _DimensionList = require('./styles/DimensionList.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DimensionList = exports.DimensionList = function (_Component) {
    (0, _inherits3.default)(DimensionList, _Component);

    function DimensionList() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DimensionList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionList.__proto__ || (0, _getPrototypeOf2.default)(DimensionList)).call.apply(_ref, [this].concat(args))), _this), _this.filterTextContains = function (dimensionName) {
            return dimensionName.toLowerCase().includes(_this.props.filterText.toLowerCase());
        }, _this.filterMatchingDimensions = function (dimension) {
            return _this.filterTextContains(dimension.name) ? _this.renderItem(dimension) : null;
        }, _this.isDisabled = function (dimension) {
            return _this.props.disabledDimension(dimension) || false;
        }, _this.isRecommended = function (dimension) {
            return _this.props.recommendedDimension(dimension) || false;
        }, _this.renderItem = function (dimension) {
            return _react2.default.createElement(_DimensionItem2.default, {
                id: dimension.id,
                key: dimension.id,
                name: dimension.name,
                isSelected: _this.props.selectedIds.includes(dimension.id),
                isRecommended: _this.isRecommended(dimension),
                isDeactivated: _this.isDisabled(dimension),
                onClick: _this.props.onDimensionClick,
                onOptionsClick: _this.props.onDimensionOptionsClick,
                onDragStart: _this.props.onDimensionDragStart
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DimensionList, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var dimensionsList = (0, _values2.default)(this.props.dimensions).map(function (dimension) {
                return _this2.props.filterText.length ? _this2.filterMatchingDimensions(dimension) : _this2.renderItem(dimension);
            });

            return _react2.default.createElement(
                'div',
                { style: _DimensionList.styles.listWrapper },
                _react2.default.createElement(
                    'ul',
                    { style: _DimensionList.styles.list },
                    dimensionsList
                )
            );
        }
    }]);
    return DimensionList;
}(_react.Component);

DimensionList.propTypes = {
    dimensions: _propTypes2.default.object.isRequired,
    disabledDimension: _propTypes2.default.func,
    recommendedDimension: _propTypes2.default.func,
    selectedIds: _propTypes2.default.array,
    filterText: _propTypes2.default.string.isRequired,
    onDimensionOptionsClick: _propTypes2.default.func,
    onDimensionClick: _propTypes2.default.func,
    onDimensionDragStart: _propTypes2.default.func
};

DimensionList.defaultProps = {
    selectedIds: [],
    disabledDimension: Function.prototype,
    recommendedDimension: Function.prototype
};

exports.default = DimensionList;