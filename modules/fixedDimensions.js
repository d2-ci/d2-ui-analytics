"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIXED_DIMENSIONS = void 0;

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _DataIcon = _interopRequireDefault(require("../assets/DataIcon"));

var _PeriodIcon = _interopRequireDefault(require("../assets/PeriodIcon"));

var _OrgUnitIcon = _interopRequireDefault(require("../assets/OrgUnitIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIXED_DIMENSIONS = {
  dx: {
    id: 'dx',
    name: _d2I18n.default.t('Data'),
    iconName: 'DataIcon',
    icon: _DataIcon.default
  },
  pe: {
    id: 'pe',
    name: _d2I18n.default.t('Period'),
    iconName: 'PeriodIcon',
    icon: _PeriodIcon.default
  },
  ou: {
    id: 'ou',
    name: _d2I18n.default.t('Organisation Unit'),
    iconName: 'OrgUnitIcon',
    icon: _OrgUnitIcon.default
  }
};
exports.FIXED_DIMENSIONS = FIXED_DIMENSIONS;