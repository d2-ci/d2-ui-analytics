import _JSXStyle from "styled-jsx/style";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ItemIcon from './ItemIcon';
import { colors } from '../styles/colors';
import styles from './styles/UnselectedItem.style';

const onClickWrapper = ({
  id,
  index,
  onClick
}) => event => onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);

export const Item = (_ref) => {
  let {
    name,
    highlighted
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["name", "highlighted"]);

  return React.createElement("div", {
    onClick: onClickWrapper(rest),
    "data-test": `dimension-item-${rest.id}`,
    className: `jsx-${styles.__hash}` + " " + (cx('item', {
      'highlighted-item': highlighted,
      'unselected-item': !highlighted
    }) || "")
  }, React.createElement(ItemIcon, {
    backgroundColor: colors.grey
  }), React.createElement("span", {
    className: `jsx-${styles.__hash}` + " " + (cx('item-label', {
      'highlighted-text': highlighted
    }) || "")
  }, name), React.createElement(_JSXStyle, {
    id: styles.__hash
  }, styles));
};
Item.defualtProps = {
  onClick: () => null
};
Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};
export default Item;