"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reorderList = void 0;

var _lodash = require("lodash");

var reorderList = function reorderList(_ref) {
  var items = _ref.items,
      highlightedItemIds = _ref.highlightedItemIds,
      destinationIndex = _ref.destinationIndex,
      sourceIndex = _ref.sourceIndex,
      draggableId = _ref.draggableId,
      isMultiDrag = _ref.isMultiDrag;
  var list = Array.from(items.map(function (item) {
    return item.id;
  }));

  if (isMultiDrag) {
    var indexedItemsToMove = (0, _lodash.sortBy)(highlightedItemIds.map(function (highlightedItemId) {
      return {
        item: highlightedItemId,
        idx: items.map(function (item) {
          return item.id;
        }).indexOf(highlightedItemId)
      };
    }), 'idx');
    var highlightedAboveDestination = indexedItemsToMove.filter(function (item) {
      return item.idx < destinationIndex;
    });
    var newDestinationIndex = destinationIndex - highlightedAboveDestination.length;
    indexedItemsToMove.forEach(function (indexed) {
      var idx = list.indexOf(indexed.item);
      list.splice(idx, 1);
    });
    indexedItemsToMove.forEach(function (indexed, i) {
      list.splice(newDestinationIndex + i, 0, indexed.item);
    });
  } else {
    list.splice(sourceIndex, 1);
    list.splice(destinationIndex, 0, draggableId);
  }

  return list;
};

exports.reorderList = reorderList;