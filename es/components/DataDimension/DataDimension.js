"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataDimension = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dxId = _fixedDimensions.FIXED_DIMENSIONS.dx.id;
var FIRST_PAGE = 1;
var DEFAULT_ALTERNATIVES = {
  dimensionItems: [],
  nextPage: FIRST_PAGE
};

var DataDimension =
/*#__PURE__*/
function (_Component) {
  _inherits(DataDimension, _Component);

  function DataDimension() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataDimension);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataDimension)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
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

    _defineProperty(_assertThisInitialized(_this), "updateGroups",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var dataType, dataTypeGroups, groups;
      return regeneratorRuntime.wrap(function _callee$(_context) {
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
              groups = Object.assign({}, _this.state.groups, _defineProperty({}, dataType, dataTypeGroups));

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

    _defineProperty(_assertThisInitialized(_this), "onDataTypeChange", function (dataType) {
      if (dataType !== _this.state.dataType) {
        var filter = Object.assign({}, _this.state.filter, _defineProperty({}, _this.state.dataType, {
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

    _defineProperty(_assertThisInitialized(_this), "requestMoreItems", function () {
      if (_this.state.nextPage) {
        _this.updateAlternatives(_this.state.nextPage, true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateAlternatives",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
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

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

    _defineProperty(_assertThisInitialized(_this), "onGroupChange",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(groupId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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

    _defineProperty(_assertThisInitialized(_this), "onDetailChange", function (groupDetail) {
      if (groupDetail !== _this.state.groupDetail) {
        _this.setState({
          groupDetail: groupDetail
        }, _this.updateAlternatives);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearFilter", function () {
      _this.setState({
        filterText: ''
      }, (0, _debounce.default)(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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

    _defineProperty(_assertThisInitialized(_this), "onFilterTextChange", function (filterText) {
      _this.setState({
        filterText: filterText
      }, (0, _debounce.default)(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
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

    _defineProperty(_assertThisInitialized(_this), "selectDataDimensions", function (selectedIds) {
      var itemsToAdd = (0, _keyBy.default)(_this.state.items.filter(function (di) {
        return selectedIds.includes(di.id);
      }), 'id');

      _this.props.onSelect({
        dimensionType: dxId,
        value: itemsToAdd
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deselectDataDimensions", function (ids) {
      _this.props.onDeselect({
        dimensionType: dxId,
        value: ids
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setUiItems", function (items) {
      return _this.props.onReorder({
        dimensionType: dxId,
        items: items
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
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

  _createClass(DataDimension, [{
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