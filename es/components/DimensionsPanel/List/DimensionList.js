function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DimensionItem from './DimensionItem';
import { styles } from './styles/DimensionList.style';
export class DimensionList extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "filterTextContains", dimensionName => {
      return dimensionName.toLowerCase().includes(this.props.filterText.toLowerCase());
    });

    _defineProperty(this, "filterMatchingDimensions", dimension => {
      return this.filterTextContains(dimension.name) ? this.renderItem(dimension) : null;
    });

    _defineProperty(this, "isDisabled", dimension => this.props.disabledDimension(dimension) || false);

    _defineProperty(this, "isRecommended", dimension => this.props.recommendedDimension(dimension) || false);

    _defineProperty(this, "renderItem", dimension => React.createElement(DimensionItem, {
      id: dimension.id,
      key: dimension.id,
      name: dimension.name,
      isSelected: this.props.selectedIds.includes(dimension.id),
      isRecommended: this.isRecommended(dimension),
      isDeactivated: this.isDisabled(dimension),
      onClick: this.props.onDimensionClick,
      onOptionsClick: this.props.onDimensionOptionsClick,
      onDragStart: this.props.onDimensionDragStart
    }));
  }

  render() {
    const dimensionsList = Object.values(this.props.dimensions).map(dimension => this.props.filterText.length ? this.filterMatchingDimensions(dimension) : this.renderItem(dimension));
    return React.createElement("div", {
      style: styles.listWrapper
    }, React.createElement("ul", {
      style: styles.list
    }, dimensionsList));
  }

}
DimensionList.propTypes = {
  dimensions: PropTypes.object.isRequired,
  disabledDimension: PropTypes.func,
  recommendedDimension: PropTypes.func,
  selectedIds: PropTypes.array,
  filterText: PropTypes.string.isRequired,
  onDimensionOptionsClick: PropTypes.func,
  onDimensionClick: PropTypes.func,
  onDimensionDragStart: PropTypes.func
};
DimensionList.defaultProps = {
  selectedIds: [],
  disabledDimension: Function.prototype,
  recommendedDimension: Function.prototype
};
export default DimensionList;