import _JSXStyle from "styled-jsx/style";
import React from 'react';
import PropTypes from 'prop-types';
import DeselectIcon from '@material-ui/icons/Close';
import styles from './styles/DeselectIconButton.style';
export const DeselectIconButton = ({
  fill,
  onClick
}) => {
  const iconStyle = {
    height: '13px',
    width: '10px',
    fill
  };
  return React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    className: `jsx-${styles.__hash}` + " " + "deselect-icon-button"
  }, React.createElement("span", {
    className: `jsx-${styles.__hash}`
  }, React.createElement(DeselectIcon, {
    style: iconStyle
  })), React.createElement(_JSXStyle, {
    id: styles.__hash
  }, styles));
};
DeselectIconButton.propTypes = {
  fill: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
export default DeselectIconButton;