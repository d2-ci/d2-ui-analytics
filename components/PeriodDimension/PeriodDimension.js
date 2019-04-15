"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PeriodDimension = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _d2UiPeriodSelectorDialog = require("@dhis2/d2-ui-period-selector-dialog");

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _fixedDimensions = require("../../modules/fixedDimensions");

var peId = _fixedDimensions.FIXED_DIMENSIONS.pe.id;
var PERIOD = 'PERIOD';

var PeriodDimension =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PeriodDimension, _Component);

  function PeriodDimension() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PeriodDimension);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PeriodDimension)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectPeriods", function (periods) {
      var itemsToAdd = periods.reduce(function (array, item) {
        array.push((0, _objectSpread2.default)({}, item, {
          dimensionItemType: PERIOD
        }));
        return array;
      }, []);

      _this.props.onSelect({
        dimensionType: peId,
        value: [].concat((0, _toConsumableArray2.default)(_this.props.selectedPeriods), (0, _toConsumableArray2.default)(itemsToAdd))
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "deselectPeriods", function (periods) {
      var idsToRemove = periods.map(function (period) {
        return period.id;
      });

      _this.props.onDeselect({
        dimensionType: peId,
        value: idsToRemove
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "reorderPeriods", function (periods) {
      var ids = periods.map(function (period) {
        return period.id;
      });

      _this.props.onReorder({
        dimensionType: peId,
        value: ids
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
      var selectedPeriods = _this.props.selectedPeriods;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DialogTitle.default, null, _d2I18n.default.t('Period')), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_d2UiPeriodSelectorDialog.PeriodSelector, {
        onSelect: _this.selectPeriods,
        onDeselect: _this.deselectPeriods,
        onReorder: _this.reorderPeriods,
        selectedItems: selectedPeriods
      })));
    });
    return _this;
  }

  return PeriodDimension;
}(_react.Component);

exports.PeriodDimension = PeriodDimension;
PeriodDimension.propTypes = {
  d2: _propTypes.default.object,
  selectedPeriods: _propTypes.default.array,
  onSelect: _propTypes.default.func.isRequired,
  onDeselect: _propTypes.default.func.isRequired,
  onReorder: _propTypes.default.func.isRequired
};
PeriodDimension.defaultProps = {
  selectedPeriods: []
};
var _default = PeriodDimension;
exports.default = _default;