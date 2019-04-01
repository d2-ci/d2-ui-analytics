'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiFetchAlternatives = exports.apiFetchGroups = exports.apiFetchItemsByDimension = exports.apiFetchRecommendedIds = exports.apiFetchDimensions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _index = require('./index');

var _dataSets = require('../modules/dataSets');

var _dataTypes = require('../modules/dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Request util functions
var selectFromResponse = function selectFromResponse(response, entity, selectorFn) {
    return typeof selectorFn === 'function' ? selectorFn(response) : response[entity];
};

// Request functions
var request = function request(d2, entity, paramString) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        selectorFn = _ref.selectorFn;

    var url = '/' + entity + '?' + paramString + '&paging=false';

    return d2.Api.getApi().get(url).then(function (response) {
        return selectFromResponse(response, entity, selectorFn);
    }).catch(_index.onError);
};

var requestWithPaging = function requestWithPaging(d2, entity, paramString, page) {
    var _ref2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        selectorFn = _ref2.selectorFn;

    var paging = '&paging=true&page=' + page;
    var url = '/' + entity + '?' + paramString + paging;

    return d2.Api.getApi().get(url).then(function (response) {
        return {
            dimensionItems: selectFromResponse(response, entity, selectorFn),
            nextPage: response.pager.nextPage ? response.pager.page + 1 : null
        };
    }).catch(_index.onError);
};

// Fetch functions
var apiFetchDimensions = exports.apiFetchDimensions = function apiFetchDimensions(d2, nameProp) {
    var fields = 'fields=id,' + nameProp + '~rename(name),dimensionType';
    var order = 'order=' + nameProp + ':asc';

    var params = fields + '&' + order;

    return request(d2, 'dimensions', params);
};

var apiFetchRecommendedIds = exports.apiFetchRecommendedIds = function apiFetchRecommendedIds(d2, dxIds, ouIds) {
    var dimensions = 'dimension=';

    if (dxIds.length) {
        dimensions = dimensions.concat('dx:' + dxIds.join(';'));

        if (ouIds.length) dimensions = dimensions.concat('&dimension=ou:' + ouIds.join(';'));
    } else if (ouIds.length) {
        dimensions = dimensions.concat('ou:' + ouIds.join(';'));
    } else {
        return _promise2.default.resolve([]);
    }

    var url = '/dimensions/recommendations?' + dimensions + '&fields=id';
    return d2.Api.getApi().get(url).then(function (response) {
        return response.dimensions.map(function (item) {
            return item.id;
        });
    }).catch(_index.onError);
};

var apiFetchItemsByDimension = exports.apiFetchItemsByDimension = function apiFetchItemsByDimension(d2, dimensionId) {
    var fields = 'fields=id,displayName~rename(name)';
    var order = 'order=displayName:asc';

    var url = 'dimensions/' + dimensionId + '/items?' + fields + '&' + order;

    return d2.Api.getApi().get(url).then(function (response) {
        return response.items;
    });
};

var apiFetchGroups = exports.apiFetchGroups = function apiFetchGroups(d2, dataType, nameProp) {
    // indicatorGroups does not support shortName
    var name = dataType === 'indicators' ? 'displayName' : nameProp;
    var fields = 'fields=id,' + name + '~rename(name)';
    var order = 'order=' + name + ':asc';

    var params = fields + '&' + order;

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
                return _promise2.default.resolve(_dataSets.DATA_SETS_CONSTANTS);
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

var apiFetchAlternatives = function apiFetchAlternatives(args) {
    var d2 = args.d2,
        dataType = args.dataType,
        groupDetail = args.groupDetail,
        queryParams = (0, _objectWithoutProperties3.default)(args, ['d2', 'dataType', 'groupDetail']);


    switch (dataType) {
        case 'indicators':
            {
                return fetchIndicators((0, _extends3.default)({ d2: d2 }, queryParams));
            }
        case 'dataElements':
            {
                if (groupDetail === 'detail') {
                    return fetchDataElementOperands((0, _extends3.default)({ d2: d2 }, queryParams));
                } else {
                    return fetchDataElements((0, _extends3.default)({ d2: d2 }, queryParams));
                }
            }
        case 'dataSets':
            {
                return fetchDataSets((0, _extends3.default)({ d2: d2 }, queryParams));
            }
        case 'eventDataItems':
            {
                return queryParams.groupId ? getEventDataItems((0, _extends3.default)({ d2: d2 }, queryParams)) : null;
            }
        case 'programIndicators':
            {
                return queryParams.groupId ? fetchProgramIndicators((0, _extends3.default)({ d2: d2 }, queryParams)) : null;
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

    var fields = 'fields=id,' + nameProp + '~rename(name),dimensionItemType&order=' + nameProp + ':asc';
    var order = 'order=' + nameProp + ':asc';
    var filter = groupId !== 'ALL' ? '&filter=indicatorGroups.id:eq:' + groupId : '';

    if (filterText) {
        filter = filter.concat('&filter=' + nameProp + ':ilike:' + filterText);
    }

    var paramString = fields + '&' + order + filter;

    return requestWithPaging(d2, 'indicators', paramString, page);
};

var fetchDataElements = function fetchDataElements(_ref4) {
    var d2 = _ref4.d2,
        groupId = _ref4.groupId,
        page = _ref4.page,
        filterText = _ref4.filterText,
        nameProp = _ref4.nameProp;

    var idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    var fields = 'fields=' + idField + ',' + nameProp + '~rename(name)';
    var order = 'order=' + nameProp + ':asc';

    var filter = '&filter=domainType:eq:AGGREGATE';
    if (groupId !== 'ALL') {
        filter = filter.concat('&filter=dataElementGroups.id:eq:' + groupId);
    }

    if (filterText) {
        filter = filter.concat('&filter=' + nameProp + ':ilike:' + filterText);
    }

    var paramString = fields + '&' + order + filter;

    return requestWithPaging(d2, 'dataElements', paramString, page);
};

var fetchDataElementOperands = function fetchDataElementOperands(_ref5) {
    var d2 = _ref5.d2,
        groupId = _ref5.groupId,
        page = _ref5.page,
        filterText = _ref5.filterText,
        nameProp = _ref5.nameProp;

    var idField = groupId === 'ALL' ? 'id' : 'dimensionItem~rename(id)';
    var fields = 'fields=' + idField + ',' + nameProp + '~rename(name)';
    var order = 'order=' + nameProp + ':asc';

    var filter = '';
    if (groupId !== 'ALL') {
        filter = '&filter=dataElement.dataElementGroups.id:eq:' + groupId;
    }

    if (filterText) {
        var textFilter = '&filter=' + nameProp + ':ilike:' + filterText;
        filter = filter.length ? filter.concat(textFilter) : textFilter;
    }

    return requestWithPaging(d2, 'dataElementOperands', fields + '&' + order + filter, page);
};

var fetchDataSets = function fetchDataSets(_ref6) {
    var d2 = _ref6.d2,
        page = _ref6.page,
        filterText = _ref6.filterText,
        nameProp = _ref6.nameProp;

    var fields = 'fields=dimensionItem~rename(id),' + nameProp + '~rename(name)';
    var order = 'order=' + nameProp + ':asc';
    var filter = filterText ? '&filter=' + nameProp + ':ilike:' + filterText : '';

    var paramString = fields + '&' + order + filter;

    return requestWithPaging(d2, 'dataSets', paramString, page);
};

var fetchProgramDataElements = function fetchProgramDataElements(_ref7) {
    var d2 = _ref7.d2,
        groupId = _ref7.groupId,
        page = _ref7.page,
        filterText = _ref7.filterText,
        nameProp = _ref7.nameProp;

    var fields = 'fields=dimensionItem~rename(id),' + nameProp + '~rename(name),valueType';
    var order = 'order=' + nameProp + ':asc';
    var program = 'program=' + groupId;
    var filter = filterText ? '&filter=' + nameProp + ':ilike:' + filterText : '';

    var paramString = fields + '&' + order + '&' + program + filter;

    return requestWithPaging(d2, 'programDataElements', paramString, page);
};

var fetchTrackedEntityAttributes = function fetchTrackedEntityAttributes(_ref8) {
    var d2 = _ref8.d2,
        groupId = _ref8.groupId,
        page = _ref8.page,
        filterText = _ref8.filterText,
        nameProp = _ref8.nameProp;

    var fields = 'fields=' + nameProp + '~rename(name),programTrackedEntityAttributes[trackedEntityAttribute[id,' + nameProp + '~rename(name),valueType]]';
    var filter = filterText ? '&filter=' + nameProp + ':ilike:' + filterText : '';

    var paramString = '' + fields + filter;

    return request(d2, 'programs/' + groupId, paramString, {
        selectorFn: function selectorFn(r) {
            return Array.isArray(r.programTrackedEntityAttributes) ? r.programTrackedEntityAttributes.map(function (a) {
                return a.trackedEntityAttribute;
            }).map(function (a) {
                return (0, _extends3.default)({}, a, {
                    id: groupId + '.' + a.id,
                    name: r.name + ' ' + a.name
                });
            }) : [];
        }
    });
};

var getEventDataItems = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(d2, queryParams) {
        var _ref10, _ref11, dataElementsObj, attributes, filterInvalidTypes;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _promise2.default.all([fetchProgramDataElements(d2, queryParams), fetchTrackedEntityAttributes(d2, queryParams)]);

                    case 2:
                        _ref10 = _context.sent;
                        _ref11 = (0, _slicedToArray3.default)(_ref10, 2);
                        dataElementsObj = _ref11[0];
                        attributes = _ref11[1];

                        filterInvalidTypes = function filterInvalidTypes(item) {
                            return Boolean(_dataTypes.CHART_AGGREGATE_AGGREGATABLE_TYPES.includes(item.valueType));
                        };

                        return _context.abrupt('return', (0, _extends3.default)({}, dataElementsObj, {
                            dimensionItems: (0, _sortBy2.default)([].concat((0, _toConsumableArray3.default)(dataElementsObj.dimensionItems), (0, _toConsumableArray3.default)(attributes)).filter(filterInvalidTypes), 'name')
                        }));

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getEventDataItems(_x3, _x4) {
        return _ref9.apply(this, arguments);
    };
}();

var fetchProgramIndicators = function fetchProgramIndicators(_ref12) {
    var d2 = _ref12.d2,
        groupId = _ref12.groupId,
        page = _ref12.page,
        filterText = _ref12.filterText,
        nameProp = _ref12.nameProp;

    var fields = 'fields=dimensionItem~rename(id),' + nameProp + '~rename(name)';
    var order = 'order=' + nameProp + ':asc';
    var programFilter = 'filter=program.id:eq:' + groupId;
    var filter = filterText ? '&filter=' + nameProp + ':ilike:' + filterText : '';

    var paramString = fields + '&' + order + '&' + programFilter + filter;

    return requestWithPaging(d2, 'programIndicators', paramString, page);
};