function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import RecommendedIcon from './RecommendedIcon';
import OptionsButton from './OptionsButton';
import DynamicDimensionIcon from '../../../assets/DynamicDimensionIcon';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';
import { styles } from './styles/DimensionItem.style';
export class DimensionItem extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      mouseOver: false
    });

    _defineProperty(this, "onOptionsClick", id => event => this.props.onOptionsClick(event, id));

    _defineProperty(this, "onMouseOver", () => {
      this.setState({
        mouseOver: true
      });
    });

    _defineProperty(this, "onMouseExit", () => {
      this.setState({
        mouseOver: false
      });
    });

    _defineProperty(this, "getDimensionIcon", () => {
      const fixedDimension = FIXED_DIMENSIONS[this.props.id];

      if (fixedDimension) {
        const Icon = fixedDimension.icon;
        return React.createElement(Icon, {
          style: styles.fixedDimensionIcon
        });
      }

      return React.createElement(DynamicDimensionIcon, {
        style: styles.dynamicDimensionIcon
      });
    });

    _defineProperty(this, "getDimensionType", () => {
      const {
        id: id,
        name: name,
        isDeactivated: isDeactivated,
        onDragStart: onDragStart
      } = this.props;
      return React.createElement("span", {
        "data-dimensionid": id,
        style: _objectSpread({}, styles.text, isDeactivated ? styles.textDeactivated : {}),
        draggable: !isDeactivated,
        onDragStart: onDragStart
      }, i18n.t(name));
    });
  }

  render() {
    const {
      id: id,
      isDeactivated: isDeactivated,
      isSelected: isSelected,
      isRecommended: isRecommended,
      onOptionsClick: onOptionsClick
    } = this.props;
    const Icon = this.getDimensionIcon();
    const Label = this.getDimensionType();
    const listItemStyle = isSelected && !isDeactivated ? _objectSpread({}, styles.listItem, styles.selectedListItem) : styles.listItem;
    return React.createElement("li", {
      style: listItemStyle,
      onMouseOver: this.onMouseOver,
      onMouseLeave: this.onMouseExit
    }, React.createElement(DimensionLabel, this.props, React.createElement("div", {
      style: styles.iconWrapper
    }, Icon), Label, React.createElement(RecommendedIcon, {
      id: id,
      isSelected: isSelected,
      isRecommended: isRecommended
    })), onOptionsClick ? React.createElement("div", {
      style: styles.optionsWrapper
    }, this.state.mouseOver && !isDeactivated ? React.createElement(OptionsButton, {
      style: styles.optionsButton,
      onClick: this.onOptionsClick(id)
    }) : null) : null);
  }

}
DimensionItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDeactivated: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  // XXX
  isRecommended: PropTypes.bool,
  onOptionsClick: PropTypes.func,
  onClick: PropTypes.func,
  onDragStart: PropTypes.func
};
DimensionItem.defaultProps = {
  isDeactivated: false,
  isRecommended: false,
  isSelected: false
};
export default DimensionItem;