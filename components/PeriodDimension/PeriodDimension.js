'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PeriodDimension = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _d2UiPeriodSelectorDialog = require('@dhis2/d2-ui-period-selector-dialog');

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _fixedDimensions = require('../../modules/fixedDimensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var peId = _fixedDimensions.FIXED_DIMENSIONS.pe.id;

var PERIOD = 'PERIOD';

var PeriodDimension = exports.PeriodDimension = function (_Component) {
    (0, _inherits3.default)(PeriodDimension, _Component);

    function PeriodDimension() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, PeriodDimension);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PeriodDimension.__proto__ || (0, _getPrototypeOf2.default)(PeriodDimension)).call.apply(_ref, [this].concat(args))), _this), _this.selectPeriods = function (periods) {
            var itemsToAdd = periods.reduce(function (array, item) {
                array.push((0, _extends3.default)({}, item, { dimensionItemType: PERIOD }));
                return array;
            }, []);

            _this.props.onSelect({ dimensionType: peId, value: itemsToAdd });
        }, _this.deselectPeriods = function (periods) {
            var idsToRemove = periods.map(function (period) {
                return period.id;
            });

            _this.props.onDeselect({
                dimensionType: peId,
                value: idsToRemove
            });
        }, _this.reorderPeriods = function (periods) {
            var ids = periods.map(function (period) {
                return period.id;
            });

            _this.props.onReorder({
                dimensionType: peId,
                value: ids
            });
        }, _this.render = function () {
            var selectedPeriods = _this.props.selectedPeriods;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _DialogTitle2.default,
                    null,
                    _d2I18n2.default.t('Period')
                ),
                _react2.default.createElement(
                    _DialogContent2.default,
                    null,
                    _react2.default.createElement(_d2UiPeriodSelectorDialog.PeriodSelector, {
                        onSelect: _this.selectPeriods,
                        onDeselect: _this.deselectPeriods,
                        onReorder: _this.reorderPeriods,
                        selectedItems: selectedPeriods
                    })
                )
            );
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return PeriodDimension;
}(_react.Component);

PeriodDimension.propTypes = {
    d2: _propTypes2.default.object,
    selectedPeriods: _propTypes2.default.array,
    onSelect: _propTypes2.default.func.isRequired,
    onDeselect: _propTypes2.default.func.isRequired,
    onReorder: _propTypes2.default.func.isRequired
};

PeriodDimension.defaultProps = {
    selectedPeriods: []
};

exports.default = PeriodDimension;