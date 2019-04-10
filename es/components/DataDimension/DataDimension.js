function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import i18n from '@dhis2/d2-i18n';
import debounce from 'lodash/debounce';
import keyBy from 'lodash/keyBy';
import isEqual from 'lodash/isEqual';
import ItemSelector from '../ItemSelector/ItemSelector';
import DataTypes from './DataTypesSelector';
import Groups from './Groups';
import FilterField from '../FilterField';
import { apiFetchGroups, apiFetchAlternatives } from '../../api/dimensions';
import { DEFAULT_DATATYPE_ID, ALL_ID, dataTypes, defaultGroupId, defaultGroupDetail } from '../../modules/dataTypes';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
import { styles } from './styles/DataDimension.style';
const dxId = FIXED_DIMENSIONS.dx.id;
const FIRST_PAGE = 1;
const DEFAULT_ALTERNATIVES = {
  dimensionItems: [],
  nextPage: FIRST_PAGE
};
export class DataDimension extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      dataType: DEFAULT_DATATYPE_ID,
      groups: {
        indicators: [],
        dataElements: [],
        dataElementOperands: [],
        dataSets: [],
        eventDataItems: [],
        programIndicators: []
      },
      groupId: ALL_ID,
      groupDetail: '',
      filterText: '',
      items: [],
      itemsCopy: [],
      nextPage: null,
      filter: {}
    });

    _defineProperty(this, "updateGroups", async () => {
      const dataType = this.state.dataType;

      if (!this.state.groups[dataType].length) {
        const dataTypeGroups = await apiFetchGroups(this.props.d2, dataType, this.props.displayNameProp);
        const groups = Object.assign({}, this.state.groups, {
          [dataType]: dataTypeGroups
        });
        this.setState({
          groups: groups
        }, this.updateAlternatives);
      } else {
        this.updateAlternatives();
      }
    });

    _defineProperty(this, "onDataTypeChange", dataType => {
      if (dataType !== this.state.dataType) {
        const filter = Object.assign({}, this.state.filter, {
          [this.state.dataType]: {
            groupId: this.state.groupId,
            groupDetail: this.state.groupDetail
          }
        });
        const currentFilter = this.state.filter[dataType] || {};
        const groupId = currentFilter.groupId || defaultGroupId(dataType);
        const groupDetail = currentFilter.groupDetail || defaultGroupDetail(dataType);
        this.setState({
          filter: filter,
          dataType: dataType,
          groupId: groupId,
          groupDetail: groupDetail,
          filterText: ''
        }, this.updateGroups);
      }
    });

    _defineProperty(this, "requestMoreItems", () => {
      if (this.state.nextPage) {
        this.updateAlternatives(this.state.nextPage, true);
      }
    });

    _defineProperty(this, "updateAlternatives", async (page = FIRST_PAGE, concatItems = false) => {
      const {
        dataType: dataType,
        groupId: groupId,
        groupDetail: groupDetail,
        filterText: filterText
      } = this.state;
      let {
        dimensionItems: dimensionItems,
        nextPage: nextPage
      } = (await apiFetchAlternatives({
        d2: this.props.d2,
        dataType: dataType,
        groupId: groupId,
        groupDetail: groupDetail,
        page: page,
        filterText: filterText,
        nameProp: this.props.displayNameProp
      })) || DEFAULT_ALTERNATIVES;
      const augmentFn = dataTypes[dataType].augmentAlternatives;

      if (augmentFn) {
        dimensionItems = augmentFn(dimensionItems, groupId);
      }

      const items = concatItems ? this.state.items.concat(dimensionItems) : dimensionItems;
      this.setState({
        items: items.filter(di => !this.props.selectedDimensions.includes(di.id)),
        itemsCopy: items,
        nextPage: nextPage
      });
    });

    _defineProperty(this, "onGroupChange", async groupId => {
      if (groupId !== this.state.groupId) {
        this.setState({
          groupId: groupId
        }, this.updateAlternatives);
      }
    });

    _defineProperty(this, "onDetailChange", groupDetail => {
      if (groupDetail !== this.state.groupDetail) {
        this.setState({
          groupDetail: groupDetail
        }, this.updateAlternatives);
      }
    });

    _defineProperty(this, "onClearFilter", () => {
      this.setState({
        filterText: ''
      }, debounce(async () => this.updateAlternatives(), 300));
    });

    _defineProperty(this, "onFilterTextChange", filterText => {
      this.setState({
        filterText: filterText
      }, debounce(async () => this.updateAlternatives(), 300));
    });

    _defineProperty(this, "selectDataDimensions", selectedIds => {
      const itemsToAdd = keyBy(this.state.items.filter(di => selectedIds.includes(di.id)), 'id');
      this.props.onSelect({
        dimensionType: dxId,
        value: itemsToAdd
      });
    });

    _defineProperty(this, "deselectDataDimensions", ids => {
      this.props.onDeselect({
        dimensionType: dxId,
        value: ids
      });
    });

    _defineProperty(this, "setUiItems", items => this.props.onReorder({
      dimensionType: dxId,
      items: items
    }));

    _defineProperty(this, "render", () => {
      const groups = this.state.groups[this.state.dataType] || [];

      const filterZone = () => {
        return React.createElement("div", null, React.createElement(DataTypes, {
          currentDataType: this.state.dataType,
          onDataTypeChange: this.onDataTypeChange
        }), React.createElement(Groups, {
          dataType: this.state.dataType,
          groups: groups,
          groupId: this.state.groupId,
          onGroupChange: this.onGroupChange,
          onDetailChange: this.onDetailChange,
          detailValue: this.state.groupDetail
        }), React.createElement(FilterField, {
          text: this.state.filterText,
          onFilterTextChange: this.onFilterTextChange,
          onClearFilter: this.onClearFilter
        }));
      };

      const unselected = {
        items: this.state.items,
        onSelect: this.selectDataDimensions,
        filterText: this.state.filterText,
        requestMoreItems: this.requestMoreItems
      };
      const selected = {
        items: this.props.selectedDimensions,
        dialogId: dxId,
        onDeselect: this.deselectDataDimensions,
        onReorder: this.setUiItems
      };
      return React.createElement(Fragment, null, React.createElement(DialogTitle, null, i18n.t('Data')), React.createElement(DialogContent, {
        style: styles.dialogContent
      }, React.createElement(ItemSelector, {
        itemClassName: "data-dimension",
        unselected: unselected,
        selected: selected
      }, filterZone())));
    });
  }

  componentDidMount() {
    this.updateGroups();
  }

  componentDidUpdate(prevProps) {
    const prevItems = prevProps.selectedDimensions;
    const currentItems = this.props.selectedDimensions;

    if (!isEqual(prevItems, currentItems)) {
      this.setState({
        items: this.state.itemsCopy.filter(di => !currentItems.includes(di.id))
      });
    }
  }

}
DataDimension.propTypes = {
  d2: PropTypes.object.isRequired,
  displayNameProp: PropTypes.string.isRequired,
  selectedDimensions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired
};
DataDimension.defaultProps = {
  selectedDimensions: [],
  onSelect: Function.prototype,
  onDeselect: Function.prototype,
  onReorder: Function.prototype
};
export default DataDimension;