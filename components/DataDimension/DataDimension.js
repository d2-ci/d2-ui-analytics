"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataDimension = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _keyBy = _interopRequireDefault(require("lodash/keyBy"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _ItemSelector = _interopRequireDefault(require("../ItemSelector/ItemSelector"));

var _DataTypesSelector = _interopRequireDefault(require("./DataTypesSelector"));

var _Groups = _interopRequireDefault(require("./Groups"));

var _FilterField = _interopRequireDefault(require("../FilterField"));

var _dimensions = require("../../api/dimensions");

var _dataTypes = require("../../modules/dataTypes");

var _fixedDimensions = require("../../modules/fixedDimensions");

var _DataDimension = require("./styles/DataDimension.style");

var dxId = _fixedDimensions.FIXED_DIMENSIONS.dx.id;
var FIRST_PAGE = 1;
var DEFAULT_ALTERNATIVES = {
  dimensionItems: [],
  nextPage: FIRST_PAGE
};

var DataDimension =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DataDimension, _Component);

  function DataDimension() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DataDimension);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DataDimension)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      dataType: _dataTypes.DEFAULT_DATATYPE_ID,
      groups: {
        indicators: [],
        dataElements: [],
        dataElementOperands: [],
        dataSets: [],
        eventDataItems: [],
        programIndicators: []
      },
      groupId: _dataTypes.ALL_ID,
      groupDetail: '',
      filterText: '',
      items: [],
      itemsCopy: [],
      nextPage: null,
      filter: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateGroups",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var dataType, dataTypeGroups, groups;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dataType = _this.state.dataType;

              if (_this.state.groups[dataType].length) {
                _context.next = 9;
                break;
              }

              _context.next = 4;
              return (0, _dimensions.apiFetchGroups)(_this.props.d2, dataType, _this.props.displayNameProp);

            case 4:
              dataTypeGroups = _context.sent;
              groups = Object.assign({}, _this.state.groups, (0, _defineProperty2.default)({}, dataType, dataTypeGroups));

              _this.setState({
                groups: groups
              }, _this.updateAlternatives);

              _context.next = 10;
              break;

            case 9:
              _this.updateAlternatives();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDataTypeChange", function (dataType) {
      if (dataType !== _this.state.dataType) {
        var filter = Object.assign({}, _this.state.filter, (0, _defineProperty2.default)({}, _this.state.dataType, {
          groupId: _this.state.groupId,
          groupDetail: _this.state.groupDetail
        }));
        var currentFilter = _this.state.filter[dataType] || {};
        var groupId = currentFilter.groupId || (0, _dataTypes.defaultGroupId)(dataType);
        var groupDetail = currentFilter.groupDetail || (0, _dataTypes.defaultGroupDetail)(dataType);

        _this.setState({
          filter: filter,
          dataType: dataType,
          groupId: groupId,
          groupDetail: groupDetail,
          filterText: ''
        }, _this.updateGroups);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "requestMoreItems", function () {
      if (_this.state.nextPage) {
        _this.updateAlternatives(_this.state.nextPage, true);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateAlternatives",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var page,
          concatItems,
          _this$state,
          dataType,
          groupId,
          groupDetail,
          filterText,
          _ref3,
          dimensionItems,
          nextPage,
          augmentFn,
          items,
          _args2 = arguments;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : FIRST_PAGE;
              concatItems = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              _this$state = _this.state, dataType = _this$state.dataType, groupId = _this$state.groupId, groupDetail = _this$state.groupDetail, filterText = _this$state.filterText;
              _context2.next = 5;
              return (0, _dimensions.apiFetchAlternatives)({
                d2: _this.props.d2,
                dataType: dataType,
                groupId: groupId,
                groupDetail: groupDetail,
                page: page,
                filterText: filterText,
                nameProp: _this.props.displayNameProp
              });

            case 5:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 8;
                break;
              }

              _context2.t0 = DEFAULT_ALTERNATIVES;

            case 8:
              _ref3 = _context2.t0;
              dimensionItems = _ref3.dimensionItems;
              nextPage = _ref3.nextPage;
              augmentFn = _dataTypes.dataTypes[dataType].augmentAlternatives;

              if (augmentFn) {
                dimensionItems = augmentFn(dimensionItems, groupId);
              }

              items = concatItems ? _this.state.items.concat(dimensionItems) : dimensionItems;

              _this.setState({
                items: items.filter(function (di) {
                  return !_this.props.selectedDimensions.includes(di.id);
                }),
                itemsCopy: items,
                nextPage: nextPage
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onGroupChange",
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(groupId) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (groupId !== _this.state.groupId) {
                  _this.setState({
                    groupId: groupId
                  }, _this.updateAlternatives);
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDetailChange", function (groupDetail) {
      if (groupDetail !== _this.state.groupDetail) {
        _this.setState({
          groupDetail: groupDetail
        }, _this.updateAlternatives);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClearFilter", function () {
      _this.setState({
        filterText: ''
      }, (0, _debounce.default)(
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _this.updateAlternatives());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })), 300));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFilterTextChange", function (filterText) {
      _this.setState({
        filterText: filterText
      }, (0, _debounce.default)(
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this.updateAlternatives());

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })), 300));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectDataDimensions", function (selectedIds) {
      var itemsToAdd = (0, _keyBy.default)(_this.state.items.filter(function (di) {
        return selectedIds.includes(di.id);
      }), 'id');

      _this.props.onSelect({
        dimensionType: dxId,
        value: itemsToAdd
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "deselectDataDimensions", function (ids) {
      _this.props.onDeselect({
        dimensionType: dxId,
        value: ids
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setUiItems", function (items) {
      return _this.props.onReorder({
        dimensionType: dxId,
        items: items
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
      var groups = _this.state.groups[_this.state.dataType] || [];

      var filterZone = function filterZone() {
        return _react.default.createElement("div", null, _react.default.createElement(_DataTypesSelector.default, {
          currentDataType: _this.state.dataType,
          onDataTypeChange: _this.onDataTypeChange
        }), _react.default.createElement(_Groups.default, {
          dataType: _this.state.dataType,
          groups: groups,
          groupId: _this.state.groupId,
          onGroupChange: _this.onGroupChange,
          onDetailChange: _this.onDetailChange,
          detailValue: _this.state.groupDetail
        }), _react.default.createElement(_FilterField.default, {
          text: _this.state.filterText,
          onFilterTextChange: _this.onFilterTextChange,
          onClearFilter: _this.onClearFilter
        }));
      };

      var unselected = {
        items: _this.state.items,
        onSelect: _this.selectDataDimensions,
        filterText: _this.state.filterText,
        requestMoreItems: _this.requestMoreItems
      };
      var selected = {
        items: _this.props.selectedDimensions,
        dialogId: dxId,
        onDeselect: _this.deselectDataDimensions,
        onReorder: _this.setUiItems
      };
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DialogTitle.default, null, _d2I18n.default.t('Data')), _react.default.createElement(_DialogContent.default, {
        style: _DataDimension.styles.dialogContent
      }, _react.default.createElement(_ItemSelector.default, {
        itemClassName: "data-dimension",
        unselected: unselected,
        selected: selected
      }, filterZone())));
    });
    return _this;
  }

  (0, _createClass2.default)(DataDimension, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateGroups();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevItems = prevProps.selectedDimensions;
      var currentItems = this.props.selectedDimensions;

      if (!(0, _isEqual.default)(prevItems, currentItems)) {
        this.setState({
          items: this.state.itemsCopy.filter(function (di) {
            return !currentItems.includes(di.id);
          })
        });
      }
    }
  }]);
  return DataDimension;
}(_react.Component);

exports.DataDimension = DataDimension;
DataDimension.propTypes = {
  d2: _propTypes.default.object.isRequired,
  displayNameProp: _propTypes.default.string.isRequired,
  selectedDimensions: _propTypes.default.array.isRequired,
  onSelect: _propTypes.default.func.isRequired,
  onDeselect: _propTypes.default.func.isRequired,
  onReorder: _propTypes.default.func.isRequired
};
DataDimension.defaultProps = {
  selectedDimensions: [],
  onSelect: Function.prototype,
  onDeselect: Function.prototype,
  onReorder: Function.prototype
};
var _default = DataDimension;
exports.default = _default;