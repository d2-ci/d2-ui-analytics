function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '@dhis2/d2-i18n';
import { OrgUnitSelector, userOrgUnits, removeOrgUnitLastPathSegment } from '@dhis2/d2-ui-org-unit-dialog';
import { apiFetchOrganisationUnitGroups, apiFetchOrganisationUnitLevels, apiFetchOrganisationUnits } from '../../api/organisationUnits';
import { LEVEL_ID_PREFIX, GROUP_ID_PREFIX, isLevelId, isGroupId, getOrgUnitsFromIds, getLevelsFromIds, getGroupsFromIds, sortOrgUnitLevels } from '../../modules/orgUnitDimensions';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
import styles from './styles/OrgUnitDimension.style';
import { colors } from '../../modules/colors';
const ouId = FIXED_DIMENSIONS.ou.id;
export const defaultState = {
  root: undefined,
  // use "selected" property for cloning org units while user org unit(s) is (are) selected
  selected: [],
  ouLevels: [],
  ouGroups: [],
  showOrgUnitsTree: true
};

class OrgUnitDimension extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "showOrgUnitsTree", () => {
      this.setState({
        showOrgUnitsTree: true
      });
    });

    _defineProperty(this, "hideOrgUnitsTree", () => {
      this.setState({
        showOrgUnitsTree: false
      });
    });

    _defineProperty(this, "addOrgUnitPathToParentGraphMap", orgUnit => {
      const path = removeOrgUnitLastPathSegment(orgUnit.path);
      this.props.acAddParentGraphMap({
        [orgUnit.id]: path[0] === '/' ? path.substr(1) : path
      });
    });

    _defineProperty(this, "setOuUiItems", items => {
      this.props.onReorder({
        dimensionType: ouId,
        value: items
      });
    });

    _defineProperty(this, "getUserOrgUnitsFromIds", ids => {
      return userOrgUnits.filter(orgUnit => ids.includes(orgUnit.id));
    });

    _defineProperty(this, "onLevelChange", event => {
      const levelIds = event.target.value.filter(id => !!id);
      this.setOuUiItems([...this.props.ouItems.filter(ou => !isLevelId(ou.id)), ...levelIds.map(id => `${LEVEL_ID_PREFIX}-${this.state.ouLevels.find(ou => ou.id === id).level}`)]);
    });

    _defineProperty(this, "onGroupChange", event => {
      const groupIds = event.target.value.filter(id => !!id);
      this.setOuUiItems([...this.props.ouItems.filter(ou => !isGroupId(ou.id)), ...groupIds.map(id => `${GROUP_ID_PREFIX}-${id}`)]);
    });

    _defineProperty(this, "onDeselectAllClick", () => this.props.onDeselect({
      dimensionType: ouId,
      value: this.props.ouItems.map(ou => ou.id)
    }));

    _defineProperty(this, "loadOrgUnitTree", (d2, displayNameProperty) => {
      apiFetchOrganisationUnits(d2, displayNameProperty).then(rootLevel => rootLevel.toArray()[0]).then(root => {
        this.setState({
          root: root
        });
      });
    });

    _defineProperty(this, "loadOrgUnitGroups", (d2, displayNameProperty) => {
      apiFetchOrganisationUnitGroups(d2, displayNameProperty).then(organisationUnitGroups => this.setState({
        ouGroups: organisationUnitGroups
      }));
    });

    _defineProperty(this, "loadOrgUnitLevels", d2 => {
      apiFetchOrganisationUnitLevels(d2).then(organisationUnitLevels =>
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
      this.setState({
        ouLevels: sortOrgUnitLevels(organisationUnitLevels)
      }));
    });

    _defineProperty(this, "handleOrgUnitClick", (event, orgUnit) => {
      console.log('click', orgUnit);
      const selected = this.props.ouItems;

      if (selected.some(ou => ou.path === orgUnit.path)) {
        this.props.onDeselect({
          dimensionType: ouId,
          value: [orgUnit.id]
        });
      } else {
        this.props.onSelect({
          dimensionType: ouId,
          value: [_objectSpread({}, orgUnit, {
            name: orgUnit.name || orgUnit.displayName
          })]
        });
      }
    });

    _defineProperty(this, "handleUserOrgUnitClick", (event, checked) => {
      if (checked) {
        if (!this.state.selected.length) {
          this.setState({
            selected: this.props.ouItems.slice()
          });
        }

        this.setOuUiItems([...this.props.ouItems.filter(ou => this.userOrgUnitIds.includes(ou.id)), event.target.name]);
      } else {
        if (this.props.ouItems.length === 1 && this.state.selected.length > 0) {
          this.setOuUiItems(this.state.selected);
          this.setState({
            selected: []
          });
        }

        this.props.onDeselect({
          dimensionType: ouId,
          value: [event.target.name]
        });
      }
    });

    _defineProperty(this, "handleMultipleOrgUnitsSelect", orgUnits => {
      console.log('multiple ou', orgUnits);
      /*
      orgUnits.forEach(orgUnit => {
          this.addOrgUnitPathToParentGraphMap(orgUnit);
      });*/

      this.props.onSelect({
        dimensionType: ouId,
        value: orgUnits.reduce((obj, ou) => obj.push(_objectSpread({}, ou, {
          name: ou.name || ou.displayName
        })), [])
      });
    });

    _defineProperty(this, "render", () => {
      /*
      const ids = this.props.ouItems;
      const selected = getOrgUnitsFromIds(
          ids,
          this.props.metadata,
          //this.props.parentGraphMap,
          this.userOrgUnitIds
      );*/
      const selected = this.props.ouItems;
      const ids = selected.map(ou => ou.id);
      const userOrgUnits = this.getUserOrgUnitsFromIds(ids);
      const level = getLevelsFromIds(ids, this.state.ouLevels);
      const group = getGroupsFromIds(ids, this.state.ouGroups);
      return React.createElement(Fragment, null, React.createElement(DialogTitle, null, i18n.t('Organisation units')), React.createElement(DialogContent, {
        style: styles.dialogContent
      }, this.state.root && this.state.showOrgUnitsTree && React.createElement(OrgUnitSelector, {
        d2: this.props.d2,
        root: this.state.root,
        selected: selected,
        userOrgUnits: userOrgUnits,
        level: level,
        group: group,
        levelOptions: this.state.ouLevels,
        groupOptions: this.state.ouGroups,
        onLevelChange: this.onLevelChange,
        onGroupChange: this.onGroupChange,
        onDeselectAllClick: this.onDeselectAllClick,
        handleUserOrgUnitClick: this.handleUserOrgUnitClick,
        handleOrgUnitClick: this.handleOrgUnitClick,
        handleMultipleOrgUnitsSelect: this.handleMultipleOrgUnitsSelect,
        checkboxColor: "secondary",
        deselectAllTooltipFontColor: colors.black,
        deselectAllTooltipBackgroundColor: colors.greyLight,
        displayNameProperty: this.props.displayNameProperty
      }), !this.state.root && React.createElement(CircularProgress, {
        style: styles.loader
      })));
    });

    this.state = defaultState;
    this.userOrgUnitIds = userOrgUnits.map(orgUnit => orgUnit.id);
    this.loadOrgUnitTree(props.d2, props.displayNameProperty);
    this.loadOrgUnitGroups(props.d2, props.displayNameProperty);
    this.loadOrgUnitLevels(props.d2);
  }

  componentDidUpdate(prevProps) {
    const previousId = prevProps.current ? prevProps.current.id : null;
    const currentId = this.props.current ? this.props.current.id : null; // remount org units selector component to ensure
    // only selected org units are expanded

    if (previousId !== currentId) {
      this.hideOrgUnitsTree();
      setTimeout(this.showOrgUnitsTree, 0);
    }
  }

}

OrgUnitDimension.propTypes = {
  d2: PropTypes.object,
  displayNameProperty: PropTypes.string,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  onReorder: PropTypes.func,
  ouItems: PropTypes.array,
  metadata: PropTypes.object,
  //parentGraphMap: PropTypes.object.isRequired,
  //acAddParentGraphMap: PropTypes.func.isRequired,
  //acSetCurrentFromUi: PropTypes.func.isRequired,
  current: PropTypes.object
};
export default OrgUnitDimension;