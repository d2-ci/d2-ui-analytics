'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_DATATYPE_ID = exports.dataTypes = exports.ALL_ID = exports.CHART_AGGREGATE_AGGREGATABLE_TYPES = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _alternatives, _dataTypes;

exports.defaultGroupId = defaultGroupId;
exports.defaultGroupDetail = defaultGroupDetail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _dataSets = require('../modules/dataSets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHART_AGGREGATE_AGGREGATABLE_TYPES = exports.CHART_AGGREGATE_AGGREGATABLE_TYPES = ['BOOLEAN', 'TRUE_ONLY', 'INTEGER', 'INTEGER_POSITIVE', 'INTEGER_NEGATIVE', 'INTEGER_ZERO_OR_POSITIVE', 'NUMBER', 'UNIT_INTERVAL', 'PERCENTAGE'];

var ALL_ID = exports.ALL_ID = 'ALL';

var INDICATORS = 'indicators';
var DATA_ELEMENTS = 'dataElements';
var DATA_SETS = 'dataSets';
var EVENT_DATA_ITEMS = 'eventDataItems';
var PROGRAM_INDICATORS = 'programIndicators';

var TOTALS = 'totals';
var DETAIL = 'detail';

var programText = _d2I18n2.default.t('Program');
var selectProgramText = _d2I18n2.default.t('Select a program');

var dataTypes = exports.dataTypes = (_dataTypes = {}, (0, _defineProperty3.default)(_dataTypes, INDICATORS, {
    id: INDICATORS,
    name: _d2I18n2.default.t('Indicators'),
    groupLabel: _d2I18n2.default.t('Select indicator group'),
    defaultGroup: { id: ALL_ID, name: _d2I18n2.default.t('[ All groups ]') },
    groupDetail: false
}), (0, _defineProperty3.default)(_dataTypes, DATA_ELEMENTS, {
    id: DATA_ELEMENTS,
    name: _d2I18n2.default.t('Data elements'),
    groupLabel: _d2I18n2.default.t('Select data element group'),
    defaultGroup: { id: ALL_ID, name: _d2I18n2.default.t('[ All data elements ]') },
    groupDetail: {
        alternatives: (_alternatives = {}, (0, _defineProperty3.default)(_alternatives, TOTALS, _d2I18n2.default.t('Totals')), (0, _defineProperty3.default)(_alternatives, DETAIL, _d2I18n2.default.t('Details')), _alternatives),
        default: TOTALS
    }
}), (0, _defineProperty3.default)(_dataTypes, DATA_SETS, {
    id: DATA_SETS,
    name: _d2I18n2.default.t('Data sets'),
    groupLabel: _d2I18n2.default.t('Select data sets'),
    defaultGroup: { id: ALL_ID, name: _d2I18n2.default.t('[ All metrics ]') },
    groupDetail: false,
    augmentAlternatives: function augmentAlternatives(alternatives, groupId) {
        return getReportingRates(alternatives, groupId);
    }
}), (0, _defineProperty3.default)(_dataTypes, EVENT_DATA_ITEMS, {
    id: EVENT_DATA_ITEMS,
    name: _d2I18n2.default.t('Event data items'),
    groupLabel: programText,
    placeholder: function placeholder() {
        return _react2.default.createElement(
            'span',
            null,
            selectProgramText
        );
    },
    defaultGroup: null,
    groupDetail: false
}), (0, _defineProperty3.default)(_dataTypes, PROGRAM_INDICATORS, {
    id: PROGRAM_INDICATORS,
    name: _d2I18n2.default.t('Program indicators'),
    groupLabel: programText,
    placeholder: function placeholder() {
        return _react2.default.createElement(
            'span',
            null,
            selectProgramText
        );
    },
    defaultGroup: null,
    groupDetail: false
}), _dataTypes);

function defaultGroupId(dataType) {
    return dataTypes[dataType].defaultGroup ? dataTypes[dataType].defaultGroup.id : '';
}

function defaultGroupDetail(dataType) {
    return dataTypes[dataType].groupDetail ? dataTypes[dataType].groupDetail.default : '';
}

var DEFAULT_DATATYPE_ID = exports.DEFAULT_DATATYPE_ID = INDICATORS;

var getReportingRates = function getReportingRates(contents, groupSetId) {
    var dataSets = [];

    var reportingRateIndex = _dataSets.DATA_SETS_CONSTANTS.find(function (item) {
        return item.id === groupSetId;
    });

    groupSetId === ALL_ID ? _dataSets.DATA_SETS_CONSTANTS.forEach(function (reportingRate) {
        return dataSets = [].concat((0, _toConsumableArray3.default)(dataSets), (0, _toConsumableArray3.default)(contents.map(function (dataSet) {
            return concatReportingRate(dataSet, reportingRate);
        })));
    }) : dataSets = contents.map(function (dataSet) {
        return concatReportingRate(dataSet, reportingRateIndex);
    });

    return dataSets;
};

var concatReportingRate = function concatReportingRate(dataSet, reportingRate) {
    return {
        id: dataSet.id + '.' + reportingRate.id,
        name: dataSet.name + ' (' + reportingRate.name + ')'
    };
};