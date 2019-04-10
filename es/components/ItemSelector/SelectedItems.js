import _JSXStyle from "styled-jsx/style";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { sortBy } from 'lodash';
import Item from './widgets/SelectedItem';
import { ArrowButton as UnAssignButton } from './widgets/ArrowButton';
import { toggler } from './modules/toggler';
import styles from './styles/SelectedItems.style';

const Subtitle = () => React.createElement("div", {
  className: `jsx-${styles.__hash}` + " " + "subtitle-container"
}, React.createElement("span", {
  className: `jsx-${styles.__hash}` + " " + "subtitle-text"
}, i18n.t('Selected Data')), React.createElement(_JSXStyle, {
  id: styles.__hash
}, styles));

const ItemsList = ({
  innerRef: innerRef,
  children: children
}) => React.createElement("ul", {
  ref: innerRef,
  className: `jsx-${styles.__hash}` + " " + "selected-list"
}, children, React.createElement(_JSXStyle, {
  id: styles.__hash
}, styles));

const CLONE_INDEX = 9999; // a high number to not influence the actual item list

var _ref =
/*#__PURE__*/
React.createElement(Subtitle, null);

export class SelectedItems extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      highlighted: [],
      lastClickedIndex: 0,
      draggingId: null
    });

    _defineProperty(this, "onDeselectHighlighted", () => {
      this.props.onDeselect(this.state.highlighted);
      this.setState({
        highlighted: []
      });
    });

    _defineProperty(this, "onDeselectOne", id => {
      const highlighted = this.state.highlighted.filter(highlightedId => highlightedId !== id);
      this.props.onDeselect([id]);
      this.setState({
        highlighted: highlighted
      });
    });

    _defineProperty(this, "onDeselectAll", () => {
      this.props.onDeselect(this.props.items.map(item => item.id));
      this.setState({
        highlighted: []
      });
    });

    _defineProperty(this, "toggleHighlight", (isCtrlPressed, isShiftPressed, index, id) => {
      const newState = toggler(id, isCtrlPressed, isShiftPressed, index, this.state.lastClickedIndex, this.state.highlighted, this.props.items.map(item => item.id));
      this.setState({
        highlighted: newState.ids,
        lastClickedIndex: newState.lastClickedIndex
      });
    });

    _defineProperty(this, "isMultiDrag", draggableId => {
      return this.state.highlighted.includes(draggableId) && this.state.highlighted.length > 1;
    });

    _defineProperty(this, "onDragStart", start => {
      const id = start.draggableId;
      const selected = this.state.highlighted.find(itemId => itemId === id); // if dragging an item that is not highlighted, unhighlight all items

      if (!selected) {
        this.setState({
          highlighted: []
        });
      }

      this.setState({
        draggingId: start.draggableId
      });
    });

    _defineProperty(this, "reorderList", (destination, source, draggableId) => {
      const list = Array.from(this.props.items.map(item => item.id));

      if (this.isMultiDrag(draggableId)) {
        const indexedItemsToMove = sortBy(this.state.highlighted.map(item => {
          return {
            item: item,
            idx: this.props.items.map(item => item.id).indexOf(item)
          };
        }), 'idx');
        let destinationIndex = destination.index;

        if (destinationIndex < this.props.items.length - 1 && destinationIndex > 1) {
          indexedItemsToMove.forEach(indexed => {
            if (indexed.idx < destinationIndex) {
              --destinationIndex;
            }
          });
        }

        indexedItemsToMove.forEach(indexed => {
          const idx = list.indexOf(indexed.item);
          list.splice(idx, 1);
        });
        indexedItemsToMove.forEach((indexed, i) => {
          list.splice(destinationIndex + i, 0, indexed.item);
        });
      } else {
        list.splice(source.index, 1);
        list.splice(destination.index, 0, draggableId);
      }

      return list;
    });

    _defineProperty(this, "onDragEnd", ({
      destination: destination,
      source: source,
      draggableId: draggableId
    }) => {
      this.setState({
        draggingId: null
      });

      if (destination === null) {
        return;
      }

      if (destination.draggableId === source.draggableId && destination.index === source.index) {
        return;
      }

      const newList = this.reorderList(destination, source, draggableId);
      this.props.onReorder(newList);
    });

    _defineProperty(this, "renderListItem", ({
      id: id,
      name: name
    }, index) => React.createElement(Draggable, {
      draggableId: id,
      index: index,
      key: id
    }, (provided, snapshot) => {
      const isDraggedItem = snapshot.isDragging && this.state.highlighted.length > 1 && this.state.highlighted.includes(this.state.draggingId);
      const ghost = this.state.highlighted.includes(id) && Boolean(this.state.draggingId) && this.state.draggingId !== id;
      const itemText = isDraggedItem ? `${this.state.highlighted.length} items` : name;
      return React.createElement("li", _extends({
        id: id,
        onDoubleClick: () => this.onDeselectOne(id)
      }, provided.draggableProps, provided.dragHandleProps, {
        ref: provided.innerRef,
        className: `jsx-${styles.__hash}` + " " + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || "selected-list-item")
      }), React.createElement(Item, {
        id: id,
        index: index,
        name: itemText,
        highlighted: !!this.state.highlighted.includes(id),
        onRemoveItem: this.onDeselectOne,
        onClick: this.toggleHighlight,
        ghost: ghost
      }), React.createElement(_JSXStyle, {
        id: styles.__hash
      }, styles));
    }));

    _defineProperty(this, "renderCloneItem", ({
      id: id,
      name: name
    }, index) => {
      const cloneId = `${id}-clone`;
      return React.createElement(Draggable, {
        draggableId: cloneId,
        index: index,
        key: cloneId
      }, provided => React.createElement("li", _extends({
        id: cloneId
      }, provided.draggableProps, provided.dragHandleProps, {
        ref: provided.innerRef,
        className: `jsx-${styles.__hash}` + " " + (provided.dragHandleProps.className != null && provided.dragHandleProps.className || provided.draggableProps.className != null && provided.draggableProps.className || "selected-list-item")
      }), React.createElement(Item, {
        id: cloneId,
        index: CLONE_INDEX,
        name: name,
        highlighted: !!this.state.highlighted.includes(id),
        selected: true,
        ghost: true
      }), React.createElement(_JSXStyle, {
        id: styles.__hash
      }, styles)));
    });

    _defineProperty(this, "getItemListWithClone", () => {
      let list = [];
      this.props.items.forEach(item => {
        list.push(item);
        const isDraggedItem = this.isMultiDrag(this.state.draggingId) && this.state.draggingId === item.id;

        if (isDraggedItem) {
          list.push({
            id: item.id,
            name: item.name,
            clone: true
          });
        }
      });
      return list;
    });

    _defineProperty(this, "render", () => {
      const itemList = this.getItemListWithClone().map((item, i) => item.clone ? this.renderCloneItem(item, i) : this.renderListItem(item, i));
      return React.createElement(Fragment, null, _ref, React.createElement(DragDropContext, {
        onDragStart: this.onDragStart,
        onDragEnd: this.onDragEnd
      }, React.createElement(Droppable, {
        droppableId: "selected-items-droppable"
      }, provided => React.createElement(ItemsList, _extends({
        innerRef: provided.innerRef
      }, provided.droppableProps), itemList, provided.placeholder))), React.createElement("div", {
        className: `jsx-${styles.__hash}` + " " + "deselect-all-button"
      }, React.createElement(Button, {
        kind: "secondary",
        size: "small",
        onClick: this.onDeselectAll,
        label: i18n.t('Deselect All')
      })), React.createElement("div", {
        className: `jsx-${styles.__hash}` + " " + "deselect-highlighted-button"
      }, React.createElement(UnAssignButton, {
        onClick: this.onDeselectHighlighted,
        iconType: 'arrowBack'
      })), React.createElement(_JSXStyle, {
        id: styles.__hash
      }, styles));
    });
  }

}
SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired
};
export default SelectedItems;