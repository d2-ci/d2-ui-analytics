'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiFetchOrganisationUnitLevels = exports.apiFetchOrganisationUnitGroups = exports.apiFetchOrganisationUnits = exports.apiFetchOrganisationUnitRoot = undefined;

var _index = require('./index');

var apiFetchOrganisationUnitRoot = exports.apiFetchOrganisationUnitRoot = function apiFetchOrganisationUnitRoot(d2) {
    var endPoint = '/organisationUnits';
    var fields = ['id', 'displayName', 'name'];
    var url = endPoint + '?paging=false&userDataViewFallback=true&fields=' + fields.join(',');

    return d2.Api.getApi().get(url).then(function (_ref) {
        var organisationUnits = _ref.organisationUnits;
        return organisationUnits[0];
    }).catch(_index.onError);
};

/**
 * Fetch organisation units
 * @returns {Promise<T | never>}
 */
var apiFetchOrganisationUnits = exports.apiFetchOrganisationUnits = function apiFetchOrganisationUnits(d2, displayNameProperty) {
    var fields = ['id', 'path', displayNameProperty + '~rename(displayName)', 'children::isNotEmpty'];

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
var apiFetchOrganisationUnitGroups = exports.apiFetchOrganisationUnitGroups = function apiFetchOrganisationUnitGroups(d2, displayNameProperty) {
    var endPoint = '/organisationUnitGroups';
    var fields = ['id', displayNameProperty + '~rename(displayName)', 'name'];
    var url = endPoint + '?paging=false&fields=' + fields.join(',');

    return d2.Api.getApi().get(url).then(function (_ref2) {
        var organisationUnitGroups = _ref2.organisationUnitGroups;
        return organisationUnitGroups;
    }).catch(_index.onError);
};

/**
 * Fetch organisation unit levels
 * @returns {*}
 */
var apiFetchOrganisationUnitLevels = exports.apiFetchOrganisationUnitLevels = function apiFetchOrganisationUnitLevels(d2) {
    var endPoint = '/organisationUnitLevels';
    var fields = ['id', 'displayName', 'name', 'level'];
    var url = endPoint + '?paging=false&fields=' + fields.join(',');

    return d2.Api.getApi().get(url).then(function (_ref3) {
        var organisationUnitLevels = _ref3.organisationUnitLevels;
        return organisationUnitLevels;
    }).catch(_index.onError);
};