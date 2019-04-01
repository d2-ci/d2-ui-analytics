'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DimensionsPanel = undefined;

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

var _Filter = require('../Filter/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

var _DimensionList = require('./List/DimensionList');

var _DimensionList2 = _interopRequireDefault(_DimensionList);

var _DimensionsPanel = require('./styles/DimensionsPanel.style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DimensionsPanel = exports.DimensionsPanel = function (_Component) {
    (0, _inherits3.default)(DimensionsPanel, _Component);

    function DimensionsPanel() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DimensionsPanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionsPanel.__proto__ || (0, _getPrototypeOf2.default)(DimensionsPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = { filterText: '' }, _this.onClearFilter = function () {
            _this.setState({ filterText: '' });
        }, _this.onFilterTextChange = function (filterText) {
            _this.setState({ filterText: filterText });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DimensionsPanel, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dimensions = _props.dimensions,
                selectedIds = _props.selectedIds,
                disabledDimension = _props.disabledDimension,
                recommendedDimension = _props.recommendedDimension,
                onDimensionClick = _props.onDimensionClick,
                onDimensionOptionsClick = _props.onDimensionOptionsClick,
                onDimensionDragStart = _props.onDimensionDragStart;


            return _react2.default.createElement(
                'div',
                { style: _DimensionsPanel.styles.divContainer },
                _react2.default.createElement(_Filter2.default, {
                    style: _DimensionsPanel.styles.textField,
                    placeholder: _d2I18n2.default.t('Search dimensions'),
                    text: this.state.filterText,
                    onChange: this.onFilterTextChange,
                    onClear: this.onClearFilter
                }),
                _react2.default.createElement(_DimensionList2.default, {
                    dimensions: dimensions,
                    selectedIds: selectedIds,
                    filterText: this.state.filterText,
                    disabledDimension: disabledDimension,
                    recommendedDimension: recommendedDimension,
                    onDimensionOptionsClick: onDimensionOptionsClick,
                    onDimensionClick: onDimensionClick,
                    onDimensionDragStart: onDimensionDragStart
                })
            );
        }
    }]);
    return DimensionsPanel;
}(_react.Component);

DimensionsPanel.propTypes = {
    dimensions: _propTypes2.default.object.isRequired,
    selectedIds: _propTypes2.default.array,
    disabledDimension: _propTypes2.default.func,
    recommendedDimension: _propTypes2.default.func,
    onDimensionClick: _propTypes2.default.func,
    onDimensionOptionsClick: _propTypes2.default.func,
    onDimensionDragStart: _propTypes2.default.func
};

DimensionsPanel.defaultProps = {
    selectedIds: [],
    onDimensionClick: Function.prototype
};

exports.default = DimensionsPanel;