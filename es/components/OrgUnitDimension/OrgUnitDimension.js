"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultState = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inherits(OrgUnitDimension, _Component);

  function OrgUnitDimension(props) {
    var _this;

    _classCallCheck(this, OrgUnitDimension);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrgUnitDimension).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showOrgUnitsTree", function () {
      _this.setState({
        showOrgUnitsTree: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideOrgUnitsTree", function () {
      _this.setState({
        showOrgUnitsTree: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addOrgUnitPathToParentGraphMap", function (orgUnit) {
      var path = (0, _d2UiOrgUnitDialog.removeOrgUnitLastPathSegment)(orgUnit.path);

      _this.props.acAddParentGraphMap(_defineProperty({}, orgUnit.id, path[0] === '/' ? path.substr(1) : path));
    });

    _defineProperty(_assertThisInitialized(_this), "setOuUiItems", function (items) {
      _this.props.onReorder({
        dimensionType: ouId,
        value: items
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getUserOrgUnitsFromIds", function (ids) {
      return _d2UiOrgUnitDialog.userOrgUnits.filter(function (orgUnit) {
        return ids.includes(orgUnit.id);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLevelChange", function (event) {
      var levelIds = event.target.value.filter(function (id) {
        return !!id;
      });

      _this.setOuUiItems([].concat(_toConsumableArray(_this.props.ouItems.filter(function (ou) {
        return !(0, _orgUnitDimensions.isLevelId)(ou.id);
      })), _toConsumableArray(levelIds.map(function (id) {
        return "".concat(_orgUnitDimensions.LEVEL_ID_PREFIX, "-").concat(_this.state.ouLevels.find(function (ou) {
          return ou.id === id;
        }).level);
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "onGroupChange", function (event) {
      var groupIds = event.target.value.filter(function (id) {
        return !!id;
      });

      _this.setOuUiItems([].concat(_toConsumableArray(_this.props.ouItems.filter(function (ou) {
        return !(0, _orgUnitDimensions.isGroupId)(ou.id);
      })), _toConsumableArray(groupIds.map(function (id) {
        return "".concat(_orgUnitDimensions.GROUP_ID_PREFIX, "-").concat(id);
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselectAllClick", function () {
      return _this.props.onDeselect({
        dimensionType: ouId,
        value: _this.props.ouItems.map(function (ou) {
          return ou.id;
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadOrgUnitTree", function (d2, displayNameProperty) {
      (0, _organisationUnits.apiFetchOrganisationUnits)(d2, displayNameProperty).then(function (rootLevel) {
        return rootLevel.toArray()[0];
      }).then(function (root) {
        _this.setState({
          root: root
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadOrgUnitGroups", function (d2, displayNameProperty) {
      (0, _organisationUnits.apiFetchOrganisationUnitGroups)(d2, displayNameProperty).then(function (organisationUnitGroups) {
        return _this.setState({
          ouGroups: organisationUnitGroups
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadOrgUnitLevels", function (d2) {
      (0, _organisationUnits.apiFetchOrganisationUnitLevels)(d2).then(function (organisationUnitLevels) {
        return (
          /*
              transformOptionsIntoMetadata(
                  organisationUnitLevels,
                  this.props.metadata,
                  ['id', 'displayName', 'name', 'level']
              )
          )
          .then(({ options, metadata }) => {
              this.props.acAddMetadata(metadata);
              */
          _this.setState({
            ouLevels: (0, _orgUnitDimensions.sortOrgUnitLevels)(organisationUnitLevels)
          })
        );
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOrgUnitClick", function (event, orgUnit) {
      console.log('click', orgUnit);
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
          value: [_objectSpread({}, orgUnit, {
            name: orgUnit.name || orgUnit.displayName
          })]
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleUserOrgUnitClick", function (event, checked) {
      if (checked) {
        if (!_this.state.selected.length) {
          _this.setState({
            selected: _this.props.ouItems.slice()
          });
        }

        _this.setOuUiItems([].concat(_toConsumableArray(_this.props.ouItems.filter(function (ou) {
          return _this.userOrgUnitIds.includes(ou.id);
        })), [event.target.name]));
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

    _defineProperty(_assertThisInitialized(_this), "handleMultipleOrgUnitsSelect", function (orgUnits) {
      console.log('multiple ou', orgUnits);
      /*
      orgUnits.forEach(orgUnit => {
          this.addOrgUnitPathToParentGraphMap(orgUnit);
      });*/

      _this.props.onSelect({
        dimensionType: ouId,
        value: orgUnits.reduce(function (obj, ou) {
          return obj.push(_objectSpread({}, ou, {
            name: ou.name || ou.displayName
          }));
        }, [])
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      /*
      const ids = this.props.ouItems;
      const selected = getOrgUnitsFromIds(
          ids,
          this.props.metadata,
          //this.props.parentGraphMap,
          this.userOrgUnitIds
      );*/
      var selected = _this.props.ouItems;
      var ids = selected.map(function (ou) {
        return ou.id;
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

  _createClass(OrgUnitDimension, [{
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
  metadata: _propTypes.default.object,
  //parentGraphMap: PropTypes.object.isRequired,
  //acAddParentGraphMap: PropTypes.func.isRequired,
  //acSetCurrentFromUi: PropTypes.func.isRequired,
  current: _propTypes.default.object
};
var _default = OrgUnitDimension;
exports.default = _default;