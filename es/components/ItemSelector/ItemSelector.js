import _JSXStyle from "styled-jsx/style";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';
import styles from './styles/ItemSelector.style';

class ItemSelector extends Component {
  render() {
    const {
      unselected: unselected,
      selected: selected,
      children: filterZone
    } = this.props;
    return React.createElement("div", {
      className: `jsx-${styles.__hash}` + " " + "item-selector-container"
    }, React.createElement("div", {
      className: `jsx-${styles.__hash}` + " " + (cx('section', 'unselected') || "")
    }, filterZone, React.createElement(UnselectedItems, unselected)), React.createElement("div", {
      className: `jsx-${styles.__hash}` + " " + (cx('section', 'selected') || "")
    }, React.createElement(SelectedItems, selected)), React.createElement(_JSXStyle, {
      id: styles.__hash
    }, styles));
  }

}

ItemSelector.propTypes = {
  unselected: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
    filterText: PropTypes.string,
    requestMoreItems: PropTypes.func
  }),
  selected: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    dialogId: PropTypes.string,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired
  })
};
export default ItemSelector;