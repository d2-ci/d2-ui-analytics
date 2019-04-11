"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PeriodDimension = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _d2UiPeriodSelectorDialog = require("@dhis2/d2-ui-period-selector-dialog");

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _fixedDimensions = require("../../modules/fixedDimensions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var peId = _fixedDimensions.FIXED_DIMENSIONS.pe.id;
var PERIOD = 'PERIOD';

var PeriodDimension =
/*#__PURE__*/
function (_Component) {
  _inherits(PeriodDimension, _Component);

  function PeriodDimension() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PeriodDimension);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PeriodDimension)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "selectPeriods", function (periods) {
      var itemsToAdd = periods.reduce(function (array, item) {
        array.push(_objectSpread({}, item, {
          dimensionItemType: PERIOD
        }));
        return array;
      }, []);

      _this.props.onSelect({
        dimensionType: peId,
        value: itemsToAdd
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deselectPeriods", function (periods) {
      var idsToRemove = periods.map(function (period) {
        return period.id;
      });

      _this.props.onDeselect({
        dimensionType: peId,
        value: idsToRemove
      });
    });

    _defineProperty(_assertThisInitialized(_this), "reorderPeriods", function (periods) {
      var ids = periods.map(function (period) {
        return period.id;
      });

      _this.props.onReorder({
        dimensionType: peId,
        value: ids
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
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