'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DATA_SETS_CONSTANTS = exports.EXPECTED_REPORTS = exports.ACTUAL_REPORTS_ON_TIME = exports.ACTUAL_REPORTS = exports.REPORTING_RATE_ON_TIME = exports.REPORTING_RATE = undefined;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REPORTING_RATE = exports.REPORTING_RATE = 'REPORTING_RATE';
var REPORTING_RATE_ON_TIME = exports.REPORTING_RATE_ON_TIME = 'REPORTING_RATE_ON_TIME';
var ACTUAL_REPORTS = exports.ACTUAL_REPORTS = 'ACTUAL_REPORTS';
var ACTUAL_REPORTS_ON_TIME = exports.ACTUAL_REPORTS_ON_TIME = 'ACTUAL_REPORTS_ON_TIME';
var EXPECTED_REPORTS = exports.EXPECTED_REPORTS = 'EXPECTED_REPORTS';

var DATA_SETS_CONSTANTS = exports.DATA_SETS_CONSTANTS = [{
    id: REPORTING_RATE,
    name: _d2I18n2.default.t('Reporting rate')
}, {
    id: REPORTING_RATE_ON_TIME,
    name: _d2I18n2.default.t('Reporting rate on time')
}, {
    id: ACTUAL_REPORTS,
    name: _d2I18n2.default.t('Actual reports')
}, {
    id: ACTUAL_REPORTS_ON_TIME,
    name: _d2I18n2.default.t('Actual reports on time')
}, {
    id: EXPECTED_REPORTS,
    name: _d2I18n2.default.t('Expected reports')
}];