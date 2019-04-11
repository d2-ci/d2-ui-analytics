"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultState = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _d2I18n = _interopRequireDefault(require("@dhis2/d2-i18n"));

var _d2UiOrgUnitDialog = require("@dhis2/d2-ui-org-unit-dialog");

var _organisationUnits = require("../../api/organisationUnits");

var _orgUnitDimensions = require("../../modules/orgUnitDimensions");

var _fixedDimensions = require("../../modules/fixedDimensions");

var _OrgUnitDimension = _interopRequireDefault(require("./styles/OrgUnitDimension.style"));

var _colors = require("../../modules/colors");

var ouId = _fixedDimensions.FIXED_DIMENSIONS.ou.id;
var defaultState = {
  root: undefined,
  // use "selected" property for cloning org units while user org unit(s) is (are) selected
  selected: [],
  ouLevels: [],
  ouGroups: [],
  showOrgUnitsTree: true
};
exports.defaultState = defaultState;

var OrgUnitDimension =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(OrgUnitDimension, _Component);

  function OrgUnitDimension(props) {
    var _this;

    (0, _classCallCheck2.default)(this, OrgUnitDimension);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OrgUnitDimension).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showOrgUnitsTree", function () {
      _this.setState({
        showOrgUnitsTree: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hideOrgUnitsTree", function () {
      _this.setState({
        showOrgUnitsTree: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setOuUiItems", function (ids) {
      _this.props.onReorder({
        dimensionType: ouId,
        value: ids
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getUserOrgUnitsFromIds", function (ids) {
      return _d2UiOrgUnitDialog.userOrgUnits.filter(function (ou) {
        return ids.includes(ou.id);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLevelChange", function (event) {
      var levelIds = event.target.value.filter(function (id) {
        return !!id;
      });

      _this.props.onSelect({
        dimensionType: ouId,
        value: [].concat((0, _toConsumableArray2.default)(_this.props.ouItems.filter(function (ou) {
          return !(0, _orgUnitDimensions.isLevelId)(ou.id);
        })), (0, _toConsumableArray2.default)(levelIds.map(function (id) {
          var levelOu = _this.state.ouLevels.find(function (ou) {
            return ou.id === id;
          });

          return (0, _objectSpread2.default)({}, levelOu, {
            id: "".concat(_orgUnitDimensions.LEVEL_ID_PREFIX, "-").concat(levelOu.level)
          });
        })))
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onGroupChange", function (event) {
      var groupIds = event.target.value.filter(function (id) {
        return !!id;
      });

      _this.props.onSelect({
        dimensionType: ouId,
        value: [].concat((0, _toConsumableArray2.default)(_this.props.ouItems.filter(function (ou) {
          return !(0, _orgUnitDimensions.isGroupId)(ou.id);
        })), (0, _toConsumableArray2.default)(groupIds.map(function (id) {
          var groupOu = _this.state.ouGroups.find(function (ou) {
            return ou.id === id;
          });

          return (0, _objectSpread2.default)({}, groupOu, {
            id: "".concat(_orgUnitDimensions.GROUP_ID_PREFIX, "-").concat(id)
          });
        })))
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDeselectAllClick", function () {
      return _this.props.onDeselect({
        dimensionType: ouId,
        value: _this.props.ouItems.map(function (ou) {
          return ou.id;
        })
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loadOrgUnitTree", function (d2, displayNameProperty) {
      (0, _organisationUnits.apiFetchOrganisationUnits)(d2, displayNameProperty).then(function (rootLevel) {
        return rootLevel.toArray()[0];
      }).then(function (root) {
        _this.setState({
          root: root
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loadOrgUnitGroups", function (d2, displayNameProperty) {
      (0, _organisationUnits.apiFetchOrganisationUnitGroups)(d2, displayNameProperty).then(function (organisationUnitGroups) {
        return _this.setState({
          ouGroups: organisationUnitGroups
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "loadOrgUnitLevels", function (d2) {
      (0, _organisationUnits.apiFetchOrganisationUnitLevels)(d2).then(function (organisationUnitLevels) {
        return _this.setState({
          ouLevels: (0, _orgUnitDimensions.sortOrgUnitLevels)(organisationUnitLevels)
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleOrgUnitClick", function (event, orgUnit) {
      var selected = _this.props.ouItems;

      if (selected.some(function (ou) {
        return ou.path === orgUnit.path;
      })) {
        _this.props.onDeselect({
          dimensionType: ouId,
          value: [orgUnit.id]
        });
      } else {
        _this.props.onSelect({
          dimensionType: ouId,
          value: [].concat((0, _toConsumableArray2.default)(selected), [(0, _objectSpread2.default)({}, orgUnit, {
            name: orgUnit.name || orgUnit.displayName
          })])
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleUserOrgUnitClick", function (event, checked) {
      if (checked) {
        if (!_this.state.selected.length) {
          _this.setState({
            selected: _this.props.ouItems.slice()
          });
        }

        _this.props.onSelect({
          dimensionType: ouId,
          value: [].concat((0, _toConsumableArray2.default)(_this.props.ouItems.filter(function (ou) {
            return _this.userOrgUnitIds.includes(ou.id);
          })), [_d2UiOrgUnitDialog.userOrgUnits.find(function (ou) {
            return ou.id === event.target.name;
          })])
        });
      } else {
        if (_this.props.ouItems.length === 1 && _this.state.selected.length > 0) {
          _this.setOuUiItems(_this.state.selected);

          _this.setState({
            selected: []
          });
        }

        _this.props.onDeselect({
          dimensionType: ouId,
          value: [event.target.name]
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleMultipleOrgUnitsSelect", function (orgUnits) {
      var selected = _this.props.ouItems;

      _this.props.onSelect({
        dimensionType: ouId,
        value: [].concat((0, _toConsumableArray2.default)(selected), (0, _toConsumableArray2.default)(orgUnits.reduce(function (obj, ou) {
          // avoid duplicates when clicking "Select children" multiple times
          if (!selected.find(function (i) {
            return i.id === ou.id;
          })) {
            obj.push((0, _objectSpread2.default)({}, ou, {
              name: ou.name || ou.displayName
            }));
          }

          return obj;
        }, [])))
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
      var ids = _this.props.ouItems.map(function (ou) {
        return ou.id;
      }) || [];

      var selected = _this.props.ouItems.filter(function (ou) {
        return (// filter out user org units
          !_this.userOrgUnitIds.includes(ou.id) && // filter out levels
          !(0, _orgUnitDimensions.isLevelId)(ou.id) && // filter out groups
          !(0, _orgUnitDimensions.isGroupId)(ou.id)
        );
      });

      var userOrgUnits = _this.getUserOrgUnitsFromIds(ids);

      var level = (0, _orgUnitDimensions.getLevelsFromIds)(ids, _this.state.ouLevels);
      var group = (0, _orgUnitDimensions.getGroupsFromIds)(ids, _this.state.ouGroups);
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_DialogTitle.default, null, _d2I18n.default.t('Organisation units')), _react.default.createElement(_DialogContent.default, {
        style: _OrgUnitDimension.default.dialogContent
      }, _this.state.root && _this.state.showOrgUnitsTree && _react.default.createElement(_d2UiOrgUnitDialog.OrgUnitSelector, {
        d2: _this.props.d2,
        root: _this.state.root,
        selected: selected,
        userOrgUnits: userOrgUnits,
        level: level,
        group: group,
        levelOptions: _this.state.ouLevels,
        groupOptions: _this.state.ouGroups,
        onLevelChange: _this.onLevelChange,
        onGroupChange: _this.onGroupChange,
        onDeselectAllClick: _this.onDeselectAllClick,
        handleUserOrgUnitClick: _this.handleUserOrgUnitClick,
        handleOrgUnitClick: _this.handleOrgUnitClick,
        handleMultipleOrgUnitsSelect: _this.handleMultipleOrgUnitsSelect,
        checkboxColor: "secondary",
        deselectAllTooltipFontColor: _colors.colors.black,
        deselectAllTooltipBackgroundColor: _colors.colors.greyLight,
        displayNameProperty: _this.props.displayNameProperty
      }), !_this.state.root && _react.default.createElement(_CircularProgress.default, {
        style: _OrgUnitDimension.default.loader
      })));
    });
    _this.state = defaultState;
    _this.userOrgUnitIds = _d2UiOrgUnitDialog.userOrgUnits.map(function (orgUnit) {
      return orgUnit.id;
    });

    _this.loadOrgUnitTree(props.d2, props.displayNameProperty);

    _this.loadOrgUnitGroups(props.d2, props.displayNameProperty);

    _this.loadOrgUnitLevels(props.d2);

    return _this;
  }

  (0, _createClass2.default)(OrgUnitDimension, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var previousId = prevProps.current ? prevProps.current.id : null;
      var currentId = this.props.current ? this.props.current.id : null; // remount org units selector component to ensure
      // only selected org units are expanded

      if (previousId !== currentId) {
        this.hideOrgUnitsTree();
        setTimeout(this.showOrgUnitsTree, 0);
      }
    }
  }]);
  return OrgUnitDimension;
}(_react.Component);

OrgUnitDimension.propTypes = {
  d2: _propTypes.default.object,
  displayNameProperty: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  onDeselect: _propTypes.default.func,
  onReorder: _propTypes.default.func,
  ouItems: _propTypes.default.array,
  current: _propTypes.default.object
};
var _default = OrgUnitDimension;
exports.default = _default;