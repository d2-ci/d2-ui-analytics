import _JSXStyle from "styled-jsx/style";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ItemIcon from './ItemIcon';
import DeselectIconButton from './DeselectIconButton';
import { colors } from '../styles/colors';
import styles from './styles/SelectedItem.style';

const onClickWrapper = ({
  id,
  index,
  onClick
}) => event => onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);

export const Item = (_ref) => {
  let {
    name,
    highlighted,
    ghost,
    onRemoveItem
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["name", "highlighted", "ghost", "onRemoveItem"]);

  return React.createElement("div", {
    onClick: onClickWrapper(rest),
    "data-test": `dimension-item-${rest.id}`,
    className: `jsx-${styles.__hash}` + " " + (cx('item', {
      'highlighted-item': highlighted,
      ghost,
      'selected-item': !highlighted
    }) || "")
  }, React.createElement(ItemIcon, {
    backgroundColor: highlighted ? colors.white : colors.accentSecondary
  }), React.createElement("span", {
    className: `jsx-${styles.__hash}` + " " + (cx('item-label', {
      'highlighted-text': highlighted
    }) || "")
  }, name), React.createElement(DeselectIconButton, {
    fill: highlighted ? colors.white : colors.accentSecondary,
    onClick: () => onRemoveItem(rest.id)
  }), React.createElement(_JSXStyle, {
    id: styles.__hash
  }, styles));
};
Item.defualtProps = {
  onRemoveItem: () => null,
  onClick: () => null
};
Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  ghost: PropTypes.bool,
  onClick: PropTypes.func,
  onRemoveItem: PropTypes.func
};
export default Item;