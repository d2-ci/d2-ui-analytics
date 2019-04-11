"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformOptionsIntoMetadata = exports.sortOrgUnitLevels = exports.getGroupsFromIds = exports.getLevelsFromIds = exports.getOrgUnitsFromIds = exports.getOrgUnitPath = exports.isGroupId = exports.GROUP_ID_PREFIX = exports.isLevelId = exports.LEVEL_ID_PREFIX = void 0;

/**
 * Org unit level id prefix
 * @type {string}
 */
var LEVEL_ID_PREFIX = 'LEVEL';
/**
 * Detects if id is ou level id
 * @param id
 * @returns {boolean}
 */

exports.LEVEL_ID_PREFIX = LEVEL_ID_PREFIX;

var isLevelId = function isLevelId(id) {
  return id.substr(0, LEVEL_ID_PREFIX.length) === LEVEL_ID_PREFIX;
};
/**
 * Org unit group id prefix
 * @type {string}
 */


exports.isLevelId = isLevelId;
var GROUP_ID_PREFIX = 'OU_GROUP';
/**
 * Detects if id is group id
 * @param id
 * @returns {boolean}
 */

exports.GROUP_ID_PREFIX = GROUP_ID_PREFIX;

var isGroupId = function isGroupId(id) {
  return id.substr(0, GROUP_ID_PREFIX.length) === GROUP_ID_PREFIX;
};
/**
 * Get org unit path by ou id
 * @param id
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */


exports.isGroupId = isGroupId;

var getOrgUnitPath = function getOrgUnitPath(id, metadata, parentGraphMap) {
  if (metadata[id] && metadata[id].path) {
    return metadata[id].path;
  } // for root org units


  if (parentGraphMap[id] === id || parentGraphMap[id] === '') {
    return "/".concat(id);
  }

  return parentGraphMap[id] ? "/".concat(parentGraphMap[id], "/").concat(id) : undefined;
};
/**
 * Get org unit from ou dimension ids
 * @param ids
 * @param idsToExclude
 * @param metadata
 * @param parentGraphMap
 * @returns {*}
 */


exports.getOrgUnitPath = getOrgUnitPath;

var getOrgUnitsFromIds = function getOrgUnitsFromIds(ids, metadata, parentGraphMap) {
  var idsToExclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return ids.filter(function (id) {
    return !idsToExclude.includes(id);
  }).filter(function (id) {
    return metadata[id] !== undefined;
  }).map(function (id) {
    return {
      id: id,
      name: metadata[id].displayName || metadata[id].name,
      path: getOrgUnitPath(id, metadata, parentGraphMap)
    };
  });
};
/**
 * Get levels from ou dimension ids
 * @param ids
 * @param levelOptions
 * @returns {*}
 */


exports.getOrgUnitsFromIds = getOrgUnitsFromIds;

var getLevelsFromIds = function getLevelsFromIds(ids, levelOptions) {
  if (levelOptions.length === 0) {
    return [];
  }

  return ids.filter(isLevelId).map(function (id) {
    return id.substr(LEVEL_ID_PREFIX.length + 1);
  }).map(function (level) {
    return levelOptions.find(function (option) {
      return Number(option.level) === Number(level);
    }).id;
  });
};
/**
 * Get groups from ou dimension ids
 * @param ids
 * @param groupOptions
 * @returns {*}
 */


exports.getLevelsFromIds = getLevelsFromIds;

var getGroupsFromIds = function getGroupsFromIds(ids, groupOptions) {
  if (groupOptions.length === 0) {
    return [];
  }

  return ids.filter(isGroupId).map(function (id) {
    return id.substr(GROUP_ID_PREFIX.length + 1);
  });
};
/**
 * Sort org unit levels by level property
 * @returns {number}
 * @param levelOptions
 */


exports.getGroupsFromIds = getGroupsFromIds;

var sortOrgUnitLevels = function sortOrgUnitLevels(levelOptions) {
  return levelOptions.sort(function (a, b) {
    if (a.level < b.level) {
      return -1;
    }

    if (a.level > b.level) {
      return 1;
    }

    return 0;
  });
};
/**
 * Transform options into metadata
 * @param options
 * @param fields
 * @param metadata
 * @returns {{options: *, metadata}}
 */


exports.sortOrgUnitLevels = sortOrgUnitLevels;

var transformOptionsIntoMetadata = function transformOptionsIntoMetadata(options, metadata) {
  var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['id', 'displayName', 'name'];
  var result = {};

  var _loop = function _loop(i) {
    // skip if we already have this property in metadata
    if (metadata[options[i].id] !== undefined) {
      return "break";
    }

    result[options[i].id] = {};
    fields.forEach(function (field) {
      result[options[i].id][field] = options[i][field];
    });
  };

  for (var i = 0; i < options.length; ++i) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  return {
    options: options,
    metadata: result
  };
};

exports.transformOptionsIntoMetadata = transformOptionsIntoMetadata;