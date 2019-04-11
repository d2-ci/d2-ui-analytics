"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_SETS_CONSTANTS = exports.EXPECTED_REPORTS = exports.ACTUAL_REPORTS_ON_TIME = exports.ACTUAL_REPORTS = exports.REPORTING_RATE_ON_TIME = exports.REPORTING_RATE = void 0;

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var REPORTING_RATE = 'REPORTING_RATE';
exports.REPORTING_RATE = REPORTING_RATE;
var REPORTING_RATE_ON_TIME = 'REPORTING_RATE_ON_TIME';
exports.REPORTING_RATE_ON_TIME = REPORTING_RATE_ON_TIME;
var ACTUAL_REPORTS = 'ACTUAL_REPORTS';
exports.ACTUAL_REPORTS = ACTUAL_REPORTS;
var ACTUAL_REPORTS_ON_TIME = 'ACTUAL_REPORTS_ON_TIME';
exports.ACTUAL_REPORTS_ON_TIME = ACTUAL_REPORTS_ON_TIME;
var EXPECTED_REPORTS = 'EXPECTED_REPORTS';
exports.EXPECTED_REPORTS = EXPECTED_REPORTS;
var DATA_SETS_CONSTANTS = [{
  id: REPORTING_RATE,
  name: _d2I18n.default.t('Reporting rate')
}, {
  id: REPORTING_RATE_ON_TIME,
  name: _d2I18n.default.t('Reporting rate on time')
}, {
  id: ACTUAL_REPORTS,
  name: _d2I18n.default.t('Actual reports')
}, {
  id: ACTUAL_REPORTS_ON_TIME,
  name: _d2I18n.default.t('Actual reports on time')
}, {
  id: EXPECTED_REPORTS,
  name: _d2I18n.default.t('Expected reports')
}];
exports.DATA_SETS_CONSTANTS = DATA_SETS_CONSTANTS;