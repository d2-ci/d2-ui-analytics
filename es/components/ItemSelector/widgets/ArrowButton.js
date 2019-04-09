import _JSXStyle from "styled-jsx/style";
import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from './styles/ArrowButton.style';

var _ref =
/*#__PURE__*/
React.createElement(ArrowForward, null);

var _ref2 =
/*#__PURE__*/
React.createElement(ArrowBack, null);

export const ArrowButton = ({
  onClick: onClick,
  iconType: iconType
}) => React.createElement("button", {
  onClick: onClick,
  className: `jsx-${styles.__hash}` + " " + "arrow-button"
}, React.createElement("span", {
  className: `jsx-${styles.__hash}` + " " + "arrow-icon"
}, iconType === 'arrowForward' ? _ref : _ref2), React.createElement(_JSXStyle, {
  id: styles.__hash
}, styles));
export default ArrowButton;