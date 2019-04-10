function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles/DimensionLabel.style';
export class DimensionLabel extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onLabelClick", () => {
      if (!this.props.isDeactivated) {
        this.props.onClick(this.props.id);
      }
    });

    _defineProperty(this, "onKeyPress", event => {
      if (event.key === 'Enter' && event.ctrlKey === false) {
        this.onLabelClick();
      }
    });
  }

  render() {
    return React.createElement("div", {
      "data-test": `dimension-id-${this.props.id}`,
      className: "label",
      onClick: this.onLabelClick,
      onKeyPress: this.onKeyPress,
      tabIndex: 0,
      style: styles.label
    }, this.props.children);
  }

}

_defineProperty(DimensionLabel, "propTypes", {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDeactivated: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
});

export default DimensionLabel;