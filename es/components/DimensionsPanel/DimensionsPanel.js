function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Filter from '../Filter/Filter';
import DimensionList from './List/DimensionList';
import { styles } from './styles/DimensionsPanel.style';
export class DimensionsPanel extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      filterText: ''
    });

    _defineProperty(this, "onClearFilter", () => {
      this.setState({
        filterText: ''
      });
    });

    _defineProperty(this, "onFilterTextChange", filterText => {
      this.setState({
        filterText: filterText
      });
    });
  }

  render() {
    const {
      dimensions: dimensions,
      selectedIds: selectedIds,
      disabledDimension: disabledDimension,
      recommendedDimension: recommendedDimension,
      onDimensionClick: onDimensionClick,
      onDimensionOptionsClick: onDimensionOptionsClick,
      onDimensionDragStart: onDimensionDragStart
    } = this.props;
    return React.createElement("div", {
      style: styles.divContainer
    }, React.createElement(Filter, {
      style: styles.textField,
      placeholder: i18n.t('Search dimensions'),
      text: this.state.filterText,
      onChange: this.onFilterTextChange,
      onClear: this.onClearFilter
    }), React.createElement(DimensionList, {
      dimensions: dimensions,
      selectedIds: selectedIds,
      filterText: this.state.filterText,
      disabledDimension: disabledDimension,
      recommendedDimension: recommendedDimension,
      onDimensionOptionsClick: onDimensionOptionsClick,
      onDimensionClick: onDimensionClick,
      onDimensionDragStart: onDimensionDragStart
    }));
  }

}
DimensionsPanel.propTypes = {
  dimensions: PropTypes.object.isRequired,
  selectedIds: PropTypes.array,
  disabledDimension: PropTypes.func,
  recommendedDimension: PropTypes.func,
  onDimensionClick: PropTypes.func,
  onDimensionOptionsClick: PropTypes.func,
  onDimensionDragStart: PropTypes.func
};
DimensionsPanel.defaultProps = {
  selectedIds: [],
  onDimensionClick: Function.prototype
};
export default DimensionsPanel;