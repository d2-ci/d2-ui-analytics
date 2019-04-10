function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/RecommendedIcon.style';
export class RecommendedIcon extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      anchorEl: null
    });

    _defineProperty(this, "onMouseOver", event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "onMouseExit", () => {
      this.setState({
        anchorEl: null
      });
    });

    _defineProperty(this, "showTooltip", () => React.createElement(Popper, {
      anchorEl: this.state.anchorEl,
      open: Boolean(this.state.anchorEl),
      placement: "bottom"
    }, React.createElement(Paper, {
      style: styles.toolTip
    }, i18n.t('Dimension recommended with selected data'))));
  }

  render() {
    const TooltipOnHover = Boolean(this.state.anchorEl) ? this.showTooltip() : null;
    return this.props.isRecommended ? React.createElement("div", {
      style: styles.recommendedWrapper
    }, React.createElement("div", {
      style: styles.recommendedIcon,
      onMouseOver: this.onMouseOver,
      onMouseLeave: this.onMouseExit
    }, TooltipOnHover)) : null;
  }

}
RecommendedIcon.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isRecommended: PropTypes.bool.isRequired
};
export default RecommendedIcon;