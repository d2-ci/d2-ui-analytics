'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FIXED_DIMENSIONS = undefined;

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _DataIcon = require('../assets/DataIcon');

var _DataIcon2 = _interopRequireDefault(_DataIcon);

var _PeriodIcon = require('../assets/PeriodIcon');

var _PeriodIcon2 = _interopRequireDefault(_PeriodIcon);

var _OrgUnitIcon = require('../assets/OrgUnitIcon');

var _OrgUnitIcon2 = _interopRequireDefault(_OrgUnitIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIXED_DIMENSIONS = exports.FIXED_DIMENSIONS = {
    dx: {
        id: 'dx',
        name: _d2I18n2.default.t('Data'),
        iconName: 'DataIcon',
        icon: _DataIcon2.default
    },
    pe: {
        id: 'pe',
        name: _d2I18n2.default.t('Period'),
        iconName: 'PeriodIcon',
        icon: _PeriodIcon2.default
    },
    ou: {
        id: 'ou',
        name: _d2I18n2.default.t('Organisation Unit'),
        iconName: 'OrgUnitIcon',
        icon: _OrgUnitIcon2.default
    }
};