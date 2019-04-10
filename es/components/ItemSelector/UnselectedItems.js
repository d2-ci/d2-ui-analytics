import _JSXStyle from "styled-jsx/style";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Button from '@material-ui/core/Button/Button';
import throttle from 'lodash/throttle';
import Item from './widgets/UnselectedItem';
import { ArrowButton as AssignButton } from './widgets/ArrowButton';
import { toggler } from './modules/toggler';
import styles from './styles/UnselectedItems.style';
export class UnselectedItems extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      highlighted: [],
      lastClickedIndex: 0
    });

    _defineProperty(this, "onSelectClick", () => {
      this.props.onSelect(this.state.highlighted);
      this.setState({
        highlighted: []
      });
    });

    _defineProperty(this, "onSelectAllClick", () => {
      this.props.onSelect(this.props.items.map(i => i.id));
      this.setState({
        highlighted: []
      });
    });

    _defineProperty(this, "onDoubleClickItem", id => {
      const highlighted = this.state.highlighted.filter(dataDimId => dataDimId !== id);
      this.setState({
        highlighted: highlighted
      });
      this.props.onSelect([id]);
    });

    _defineProperty(this, "filterTextContains", displayName => displayName.toLowerCase().includes(this.props.filterText.toLowerCase()));

    _defineProperty(this, "filterItems", (item, index) => this.filterTextContains(item.name) ? this.renderListItem(item, index) : null);

    _defineProperty(this, "toggleHighlight", (isCtrlPressed, isShiftPressed, index, id) => {
      const newState = toggler(id, isCtrlPressed, isShiftPressed, index, this.state.lastClickedIndex, this.state.highlighted, this.props.items.map(item => item.id));
      this.setState({
        highlighted: newState.ids,
        lastClickedIndex: newState.lastClickedIndex
      });
    });

    _defineProperty(this, "renderListItem", (dataDim, index) => React.createElement("li", {
      key: dataDim.id,
      onDoubleClick: () => this.onDoubleClickItem(dataDim.id),
      className: `jsx-${styles.__hash}` + " " + "unselected-list-item"
    }, React.createElement(Item, {
      id: dataDim.id,
      index: index,
      name: dataDim.name,
      highlighted: !!this.state.highlighted.includes(dataDim.id),
      onClick: this.toggleHighlight
    }), React.createElement(_JSXStyle, {
      id: styles.__hash
    }, styles)));

    _defineProperty(this, "requestMoreItems", throttle(() => {
      const node = this.scrolElRef.current;

      if (node) {
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;

        if (bottom) {
          this.props.requestMoreItems();
        }
      }
    }, 1000));

    _defineProperty(this, "render", () => {
      const listItems = this.props.items.map((item, index) => this.props.filterText.length ? this.filterItems(item, index) : this.renderListItem(item, index));
      return React.createElement(Fragment, null, React.createElement("div", {
        ref: this.scrolElRef,
        onScroll: this.requestMoreItems,
        className: `jsx-${styles.__hash}` + " " + "unselected-list-container"
      }, React.createElement("ul", {
        className: `jsx-${styles.__hash}` + " " + "unselected-list"
      }, listItems)), React.createElement("div", {
        className: `jsx-${styles.__hash}` + " " + "select-all-button"
      }, React.createElement(Button, {
        onClick: this.onSelectAllClick
      }, i18n.t('Select all'))), React.createElement("div", {
        className: `jsx-${styles.__hash}` + " " + "select-highlighted-button"
      }, React.createElement(AssignButton, {
        onClick: this.onSelectClick,
        iconType: 'arrowForward'
      })), React.createElement(_JSXStyle, {
        id: styles.__hash
      }, styles));
    });

    this.scrolElRef = React.createRef();
  }

}
UnselectedItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  filterText: PropTypes.string,
  requestMoreItems: PropTypes.func
};
UnselectedItems.defaultProps = {
  requestMoreItems: () => null,
  filterText: ''
};
export default UnselectedItems;