"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _OrgUnitDimension = _interopRequireWildcard(require("../OrgUnitDimension"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref =
/*#__PURE__*/
_react.default.createElement("div", {
  id: "mockOrgUnitSelector"
}, " mockOrgUnitSelector");

jest.mock('@dhis2/d2-ui-org-unit-dialog', function () {
  return {
    OrgUnitSelector: function OrgUnitSelector() {
      return _ref;
    },
    userOrgUnits: [{
      displayName: 'User organisation unit',
      id: 'USER_ORGUNIT'
    }, {
      displayName: 'User sub-units',
      id: 'USER_ORGUNIT_CHILDREN'
    }, {
      displayName: 'User sub-x2-units',
      id: 'USER_ORGUNIT_GRANDCHILDREN'
    }],
    removeOrgUnitLastPathSegment: function removeOrgUnitLastPathSegment() {
      return null;
    }
  };
});
jest.mock('../../../api/organisationUnits', function () {
  return {
    apiFetchOrganisationUnitGroups: function apiFetchOrganisationUnitGroups() {
      return Promise.resolve([{
        displayName: 'CHC',
        id: 'CXw2yu5fodb',
        name: 'CHC'
      }, {
        displayName: 'Chiefdom',
        id: 'gzcv65VyaGq',
        name: 'Chiefdom'
      }]);
    },
    apiFetchOrganisationUnitLevels: function apiFetchOrganisationUnitLevels() {
      return Promise.resolve([{
        displayName: 'National',
        id: 'H1KlN4QIauv',
        level: 1,
        name: 'National'
      }, {
        displayName: 'District',
        id: 'wjP19dkFeIk',
        level: 2,
        name: 'District'
      }]);
    },
    apiFetchOrganisationUnits: function apiFetchOrganisationUnits() {
      return Promise.resolve({
        toArray: function toArray() {
          return [{
            id: 'jen'
          }];
        }
      });
    }
  };
});
describe('The OrgUnitDimension component ', function () {
  var props;
  var shallowDataDim;

  var orgUnitDimension = function orgUnitDimension() {
    if (!shallowDataDim) {
      shallowDataDim = (0, _enzyme.shallow)(_react.default.createElement(_OrgUnitDimension.default, props));
    }

    return shallowDataDim;
  };

  beforeEach(function () {
    props = {
      d2: {},
      ouItems: [],
      parentGraphMap: {},
      metadata: {},
      acAddUiItems: jest.fn(),
      acRemoveUiItems: jest.fn(),
      acAddParentGraphMap: jest.fn(),
      acAddMetadata: jest.fn(),
      acSetUiItems: jest.fn(),
      acSetCurrentFromUi: jest.fn(),
      current: {
        id: null
      },
      displayNameProperty: 'displayName'
    };
    shallowDataDim = undefined;
  });
  it('has default state', function () {
    var actualState = orgUnitDimension().state();
    expect(actualState).toEqual(_OrgUnitDimension.defaultState);
  });
  it('renders a DialogTitle and DialogContent component ', function () {
    var component = orgUnitDimension();
    expect(component.find(_DialogTitle.default).first().length).toEqual(1);
    expect(component.find(_DialogContent.default).first().length).toEqual(1);
  });
});