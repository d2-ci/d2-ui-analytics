"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFetchAlternatives = exports.apiFetchGroups = exports.apiFetchItemsByDimension = exports.apiFetchRecommendedIds = exports.apiFetchDimensions = void 0;

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _index = require("./index");

var _dataSets = require("../modules/dataSets");

var _dataTypes = require("../modules/dataTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Request util functions
var selectFromResponse = function selectFromResponse(response, entity, selectorFn) {
  return typeof selectorFn === 'function' ? selectorFn(response) : response[entity];
}; // Request functions


var request = function request(d2, entity, paramString) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      selectorFn = _ref.selectorFn;

  var url = "/".concat(entity, "?").concat(paramString, "&paging=false");
  return d2.Api.getApi().get(url).then(function (response) {
    return selectFromResponse(response, entity, selectorFn);
  }).catch(_index.onError);
};

var requestWithPaging = function requestWithPaging(d2, entity, paramString, page) {
  var _ref2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
      selectorFn = _ref2.selectorFn;

  var paging = "&paging=true&page=".concat(page);
  var url = "/".concat(entity, "?").concat(paramString).concat(paging);
  return d2.Api.getApi().get(url).then(function (response) {
    return {
      dimensionItems: selectFromResponse(response, entity, selectorFn),
      nextPage: response.pager.nextPage ? response.pager.page + 1 : null
    };
  }).catch(_index.onError);
}; // Fetch functions


var apiFetchDimensions = function apiFetchDimensions(d2, nameProp) {
  var fields = "fields=id,".concat(nameProp, "~rename(name),dimensionType");
  var order = "order=".concat(nameProp, ":asc");
  var params = "".concat(fields, "&").concat(order);
  return request(d2, 'dimensions', params);
};

exports.apiFetchDimensions = apiFetchDimensions;

var apiFetchRecommendedIds = function apiFetchRecommendedIds(d2, dxIds, ouIds) {
  var dimensions = 'dimension=';

  if (dxIds.length) {
    dimensions = dimensions.concat("dx:".concat(dxIds.join(';')));
    if (ouIds.length) dimensions = dimensions.concat("&dimension=ou:".concat(ouIds.join(';')));
  } else if (ouIds.length) {
    dimensions = dimensions.concat("ou:".concat(ouIds.join(';')));
  } else {
    return Promise.resolve([]);
  }

  var url = "/dimensions/recommendations?".concat(dimensions, "&fields=id");
  return d2.Api.getApi().get(url).then(function (response) {
    return response.dimensions.map(function (item) {
      return item.id;
    });
  }).catch(_index.onError);
};

exports.apiFetchRecommendedIds = apiFetchRecommendedIds;

var apiFetchItemsByDimension = function apiFetchItemsByDimension(d2, dimensionId) {
  var fields = "fields=id,displayName~rename(name)";
  var order = "order=displayName:asc";
  var url = "dimensions/".concat(dimensionId, "/items?").concat(fields, "&").concat(order);
  return d2.Api.getApi().get(url).then(function (response) {
    return response.items;
  });
};

exports.apiFetchItemsByDimension = apiFetchItemsByDimension;

var apiFetchGroups = function apiFetchGroups(d2, dataType, nameProp) {
  // indicatorGroups does not support shortName
  var name = dataType === 'indicators' ? 'displayName' : nameProp;
  var fields = "fields=id,".concat(name, "~rename(name)");
  var order = "order=".concat(name, ":asc");
  var params = "".concat(fields, "&").concat(order);

  switch (dataType) {
    case 'indicators':
      {
        return request(d2, 'indicatorGroups', params);
      }

    case 'dataElements':
      {
        return request(d2, 'dataElementGroups', params);
      }

    case 'dataSets':
      {
        return Promise.resolve(_dataSets.DATA_SETS_CONSTANTS);
      }

    case 'eventDataItems':
    case 'programIndicators':
      {
        return request(d2, 'programs', params);
      }

    default:
      return null;
  }
};

exports.apiFetchGroups = apiFetchGroups;

var apiFetchAlternatives = function apiFetchAlternatives(args) {
  var d2 = args.d2,
      dataType = args.dataType,
      groupDetail = args.groupDetail,
      queryParams = _objectWithoutProperties(args, ["d2", "dataType", "groupDetail"]);

  switch (dataType) {
    case 'indicators':
      {
        return fetchIndicators(_objectSpread({
          d2: d2
        }, queryParams));
      }

    case 'dataElements':
      {
        if (groupDetail === 'detail') {
          return fetchDataElementOperands(_objectSpread({
            d2: d2
          }, queryParams));
        } else {
          return fetchDataElements(_objectSpread({
            d2: d2
          }, queryParams));
        }
      }

    case 'dataSets':
      {
        return fetchDataSets(_objectSpread({
          d2: d2
        }, queryParams));
      }

    case 'eventDataItems':
      {
        return queryParams.groupId ? getEventDataItems(_objectSpread({
          d2: d2
        }, queryParams)) : null;
      }

    case 'programIndicators':
      {
        return queryParams.groupId ? fetchProgramIndicators(_objectSpread({
          d2: d2
        }, queryParams)) : null;
      }

    default:
      return null;
  }
};

exports.apiFetchAlternatives = apiFetchAlternatives;

var fetchIndicators = function fetchIndicators(_ref3) {
  var d2 = _ref3.d2,
      nameProp = _ref3.nameProp,
      groupId = _ref3.groupId,
      filterText = _ref3.filterText,
      page = _ref3.page;
  var fields = "fields=id,".concat(nameProp, "~rename(name),dimensionItemType&order=").concat(nameProp, ":asc");
  var order = "order=".concat(nameProp, ":asc");
  var filter = groupId !== 'ALL' ? "&filter=indicatorGroups.id:eq:".concat(groupId) : '';

  if (filterText) {
    filter = filter.concat("&filter=".concat(nameProp, ":ilike:").concat(filterText));
  }

  var paramString = "".concat(fields, "&").concat(order).concat(filter);
  return requestWithPaging(d2, 'indicators', paramString, page);
};

var fetchDataElements = function fetchDataElements(_ref4) {
  var d2 = _ref4.d2,
      groupId = _ref4.groupId,
      page = _ref4.page,
      filterText = _ref4.filterText,
      nameProp = _ref4.nameProp;
  var idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
  var fields = "fields=".concat(idField, ",").concat(nameProp, "~rename(name)");
  var order = "order=".concat(nameProp, ":asc");
  var filter = '&filter=domainType:eq:AGGREGATE';

  if (groupId !== 'ALL') {
    filter = filter.concat("&filter=dataElementGroups.id:eq:".concat(groupId));
  }

  if (filterText) {
    filter = filter.concat("&filter=".concat(nameProp, ":ilike:").concat(filterText));
  }

  var paramString = "".concat(fields, "&").concat(order).concat(filter);
  return requestWithPaging(d2, 'dataElements', paramString, page);
};

var fetchDataElementOperands = function fetchDataElementOperands(_ref5) {
  var d2 = _ref5.d2,
      groupId = _ref5.groupId,
      page = _ref5.page,
      filterText = _ref5.filterText,
      nameProp = _ref5.nameProp;
  var idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
  var fields = "fields=".concat(idField, ",").concat(nameProp, "~rename(name)");
  var order = "order=".concat(nameProp, ":asc");
  var filter = '';

  if (groupId !== 'ALL') {
    filter = "&filter=dataElement.dataElementGroups.id:eq:".concat(groupId);
  }

  if (filterText) {
    var textFilter = "&filter=".concat(nameProp, ":ilike:").concat(filterText);
    filter = filter.length ? filter.concat(textFilter) : textFilter;
  }

  return requestWithPaging(d2, 'dataElementOperands', "".concat(fields, "&").concat(order).concat(filter), page);
};

var fetchDataSets = function fetchDataSets(_ref6) {
  var d2 = _ref6.d2,
      page = _ref6.page,
      filterText = _ref6.filterText,
      nameProp = _ref6.nameProp;
  var fields = "fields=dimensionItem~rename(id),".concat(nameProp, "~rename(name)");
  var order = "order=".concat(nameProp, ":asc");
  var filter = filterText ? "&filter=".concat(nameProp, ":ilike:").concat(filterText) : '';
  var paramString = "".concat(fields, "&").concat(order).concat(filter);
  return requestWithPaging(d2, 'dataSets', paramString, page);
};

var fetchProgramDataElements = function fetchProgramDataElements(_ref7) {
  var d2 = _ref7.d2,
      groupId = _ref7.groupId,
      page = _ref7.page,
      filterText = _ref7.filterText,
      nameProp = _ref7.nameProp;
  var fields = "fields=dimensionItem~rename(id),".concat(nameProp, "~rename(name),valueType");
  var order = "order=".concat(nameProp, ":asc");
  var program = "program=".concat(groupId);
  var filter = filterText ? "&filter=".concat(nameProp, ":ilike:").concat(filterText) : '';
  var paramString = "".concat(fields, "&").concat(order, "&").concat(program).concat(filter);
  return requestWithPaging(d2, 'programDataElements', paramString, page);
};

var fetchTrackedEntityAttributes = function fetchTrackedEntityAttributes(_ref8) {
  var d2 = _ref8.d2,
      groupId = _ref8.groupId,
      page = _ref8.page,
      filterText = _ref8.filterText,
      nameProp = _ref8.nameProp;
  var fields = "fields=".concat(nameProp, "~rename(name),programTrackedEntityAttributes[trackedEntityAttribute[id,").concat(nameProp, "~rename(name),valueType]]");
  var filter = filterText ? "&filter=".concat(nameProp, ":ilike:").concat(filterText) : '';
  var paramString = "".concat(fields).concat(filter);
  return request(d2, "programs/".concat(groupId), paramString, {
    selectorFn: function selectorFn(r) {
      return Array.isArray(r.programTrackedEntityAttributes) ? r.programTrackedEntityAttributes.map(function (a) {
        return a.trackedEntityAttribute;
      }).map(function (a) {
        return _objectSpread({}, a, {
          id: "".concat(groupId, ".").concat(a.id),
          name: "".concat(r.name, " ").concat(a.name)
        });
      }) : [];
    }
  });
};

var getEventDataItems =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(d2, queryParams) {
    var _ref10, _ref11, dataElementsObj, attributes, filterInvalidTypes;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([fetchProgramDataElements(d2, queryParams), fetchTrackedEntityAttributes(d2, queryParams)]);

          case 2:
            _ref10 = _context.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            dataElementsObj = _ref11[0];
            attributes = _ref11[1];

            filterInvalidTypes = function filterInvalidTypes(item) {
              return Boolean(_dataTypes.CHART_AGGREGATE_AGGREGATABLE_TYPES.includes(item.valueType));
            };

            return _context.abrupt("return", _objectSpread({}, dataElementsObj, {
              dimensionItems: (0, _sortBy.default)([].concat(_toConsumableArray(dataElementsObj.dimensionItems), _toConsumableArray(attributes)).filter(filterInvalidTypes), 'name')
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEventDataItems(_x, _x2) {
    return _ref9.apply(this, arguments);
  };
}();

var fetchProgramIndicators = function fetchProgramIndicators(_ref12) {
  var d2 = _ref12.d2,
      groupId = _ref12.groupId,
      page = _ref12.page,
      filterText = _ref12.filterText,
      nameProp = _ref12.nameProp;
  var fields = "fields=dimensionItem~rename(id),".concat(nameProp, "~rename(name)");
  var order = "order=".concat(nameProp, ":asc");
  var programFilter = "filter=program.id:eq:".concat(groupId);
  var filter = filterText ? "&filter=".concat(nameProp, ":ilike:").concat(filterText) : '';
  var paramString = "".concat(fields, "&").concat(order, "&").concat(programFilter).concat(filter);
  return requestWithPaging(d2, 'programIndicators', paramString, page);
};