"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetchOrganisationUnitLevels = exports.apiFetchOrganisationUnitGroups = exports.apiFetchOrganisationUnits = exports.apiFetchOrganisationUnitRoot = void 0;

var _index = require("./index");

var apiFetchOrganisationUnitRoot = function apiFetchOrganisationUnitRoot(d2) {
  var endPoint = '/organisationUnits';
  var fields = ['id', 'displayName', 'name'];
  var url = "".concat(endPoint, "?paging=false&userDataViewFallback=true&fields=").concat(fields.join(','));
  return d2.Api.getApi().get(url).then(function (_ref) {
    var organisationUnits = _ref.organisationUnits;
    return organisationUnits[0];
  }).catch(_index.onError);
};
/**
 * Fetch organisation units
 * @returns {Promise<T | never>}
 */


exports.apiFetchOrganisationUnitRoot = apiFetchOrganisationUnitRoot;

var apiFetchOrganisationUnits = function apiFetchOrganisationUnits(d2, displayNameProperty) {
  var fields = ['id', 'path', "".concat(displayNameProperty, "~rename(displayName)"), 'children::isNotEmpty'];
  return d2.models.organisationUnits.list({
    paging: false,
    level: 1,
    fields: fields.join(',')
  });
};
/**
 * Fetch organisation unit groups
 * @returns {*}
 */


exports.apiFetchOrganisationUnits = apiFetchOrganisationUnits;

var apiFetchOrganisationUnitGroups = function apiFetchOrganisationUnitGroups(d2, displayNameProperty) {
  var endPoint = '/organisationUnitGroups';
  var fields = ['id', "".concat(displayNameProperty, "~rename(displayName)"), 'name'];
  var url = "".concat(endPoint, "?paging=false&fields=").concat(fields.join(','));
  return d2.Api.getApi().get(url).then(function (_ref2) {
    var organisationUnitGroups = _ref2.organisationUnitGroups;
    return organisationUnitGroups;
  }).catch(_index.onError);
};
/**
 * Fetch organisation unit levels
 * @returns {*}
 */


exports.apiFetchOrganisationUnitGroups = apiFetchOrganisationUnitGroups;

var apiFetchOrganisationUnitLevels = function apiFetchOrganisationUnitLevels(d2) {
  var endPoint = '/organisationUnitLevels';
  var fields = ['id', 'displayName', 'name', 'level'];
  var url = "".concat(endPoint, "?paging=false&fields=").concat(fields.join(','));
  return d2.Api.getApi().get(url).then(function (_ref3) {
    var organisationUnitLevels = _ref3.organisationUnitLevels;
    return organisationUnitLevels;
  }).catch(_index.onError);
};

exports.apiFetchOrganisationUnitLevels = apiFetchOrganisationUnitLevels;