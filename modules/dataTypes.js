"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultGroupId = defaultGroupId;
exports.defaultGroupDetail = defaultGroupDetail;
exports.DEFAULT_DATATYPE_ID = exports.dataTypes = exports.ALL_ID = exports.CHART_AGGREGATE_AGGREGATABLE_TYPES = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _dataSets = require("../modules/dataSets");

var _alternatives, _dataTypes;

var CHART_AGGREGATE_AGGREGATABLE_TYPES = ['BOOLEAN', 'TRUE_ONLY', 'INTEGER', 'INTEGER_POSITIVE', 'INTEGER_NEGATIVE', 'INTEGER_ZERO_OR_POSITIVE', 'NUMBER', 'UNIT_INTERVAL', 'PERCENTAGE'];
exports.CHART_AGGREGATE_AGGREGATABLE_TYPES = CHART_AGGREGATE_AGGREGATABLE_TYPES;
var ALL_ID = 'ALL';
exports.ALL_ID = ALL_ID;
var INDICATORS = 'indicators';
var DATA_ELEMENTS = 'dataElements';
var DATA_SETS = 'dataSets';
var EVENT_DATA_ITEMS = 'eventDataItems';
var PROGRAM_INDICATORS = 'programIndicators';
var TOTALS = 'totals';
var DETAIL = 'detail';

var programText = _d2I18n.default.t('Program');

var selectProgramText = _d2I18n.default.t('Select a program');

var _ref =
/*#__PURE__*/
_react.default.createElement("span", null, selectProgramText);

var _ref2 =
/*#__PURE__*/
_react.default.createElement("span", null, selectProgramText);

var dataTypes = (_dataTypes = {}, (0, _defineProperty2.default)(_dataTypes, INDICATORS, {
  id: INDICATORS,
  name: _d2I18n.default.t('Indicators'),
  groupLabel: _d2I18n.default.t('Select indicator group'),
  defaultGroup: {
    id: ALL_ID,
    name: _d2I18n.default.t('[ All groups ]')
  },
  groupDetail: false
}), (0, _defineProperty2.default)(_dataTypes, DATA_ELEMENTS, {
  id: DATA_ELEMENTS,
  name: _d2I18n.default.t('Data elements'),
  groupLabel: _d2I18n.default.t('Select data element group'),
  defaultGroup: {
    id: ALL_ID,
    name: _d2I18n.default.t('[ All data elements ]')
  },
  groupDetail: {
    alternatives: (_alternatives = {}, (0, _defineProperty2.default)(_alternatives, TOTALS, _d2I18n.default.t('Totals')), (0, _defineProperty2.default)(_alternatives, DETAIL, _d2I18n.default.t('Details')), _alternatives),
    default: TOTALS
  }
}), (0, _defineProperty2.default)(_dataTypes, DATA_SETS, {
  id: DATA_SETS,
  name: _d2I18n.default.t('Data sets'),
  groupLabel: _d2I18n.default.t('Select data sets'),
  defaultGroup: {
    id: ALL_ID,
    name: _d2I18n.default.t('[ All metrics ]')
  },
  groupDetail: false,
  augmentAlternatives: function augmentAlternatives(alternatives, groupId) {
    return getReportingRates(alternatives, groupId);
  }
}), (0, _defineProperty2.default)(_dataTypes, EVENT_DATA_ITEMS, {
  id: EVENT_DATA_ITEMS,
  name: _d2I18n.default.t('Event data items'),
  groupLabel: programText,
  placeholder: function placeholder() {
    return _ref;
  },
  defaultGroup: null,
  groupDetail: false
}), (0, _defineProperty2.default)(_dataTypes, PROGRAM_INDICATORS, {
  id: PROGRAM_INDICATORS,
  name: _d2I18n.default.t('Program indicators'),
  groupLabel: programText,
  placeholder: function placeholder() {
    return _ref2;
  },
  defaultGroup: null,
  groupDetail: false
}), _dataTypes);
exports.dataTypes = dataTypes;

function defaultGroupId(dataType) {
  return dataTypes[dataType].defaultGroup ? dataTypes[dataType].defaultGroup.id : '';
}

function defaultGroupDetail(dataType) {
  return dataTypes[dataType].groupDetail ? dataTypes[dataType].groupDetail.default : '';
}

var DEFAULT_DATATYPE_ID = INDICATORS;
exports.DEFAULT_DATATYPE_ID = DEFAULT_DATATYPE_ID;

var getReportingRates = function getReportingRates(contents, groupSetId) {
  var dataSets = [];

  var reportingRateIndex = _dataSets.DATA_SETS_CONSTANTS.find(function (item) {
    return item.id === groupSetId;
  });

  groupSetId === ALL_ID ? _dataSets.DATA_SETS_CONSTANTS.forEach(function (reportingRate) {
    return dataSets = [].concat((0, _toConsumableArray2.default)(dataSets), (0, _toConsumableArray2.default)(contents.map(function (dataSet) {
      return concatReportingRate(dataSet, reportingRate);
    })));
  }) : dataSets = contents.map(function (dataSet) {
    return concatReportingRate(dataSet, reportingRateIndex);
  });
  return dataSets;
};

var concatReportingRate = function concatReportingRate(dataSet, reportingRate) {
  return {
    id: "".concat(dataSet.id, ".").concat(reportingRate.id),
    name: "".concat(dataSet.name, " (").concat(reportingRate.name, ")")
  };
};