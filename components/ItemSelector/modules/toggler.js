"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggler = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var toggler = function toggler(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items) {
  var ids;
  var newIndex = lastClickedIndex;

  if (!isCtrlPressed && !isShiftPressed) {
    ids = [id];
    newIndex = index;
  } else if (isShiftPressed) {
    var minIndex = getMinIndex(lastClickedIndex, index);
    var maxIndex = getMaxIndex(lastClickedIndex, index);
    ids = mergeIds(highlightedIds, items, minIndex, maxIndex);
  } else {
    var newArr = updateArray(highlightedIds, id, lastClickedIndex, index);
    ids = newArr.ids;
    newIndex = newArr.newIndex;
  }

  return {
    ids: ids,
    lastClickedIndex: newIndex
  };
};

exports.toggler = toggler;

var getMinIndex = function getMinIndex(lastClickedIndex, index) {
  return lastClickedIndex > index ? index : lastClickedIndex;
};

var getMaxIndex = function getMaxIndex(lastClickedIndex, index) {
  return lastClickedIndex < index ? index : lastClickedIndex;
};

var mergeIds = function mergeIds(highlightedIds, items, minIndex, maxIndex) {
  return highlightedIds.length ? items.slice(minIndex, maxIndex + 1).filter(function (id) {
    return !highlightedIds.includes(id);
  }).concat(highlightedIds) : items.slice(minIndex, maxIndex + 1);
};

var updateArray = function updateArray(highlightedIds, id, lastClickedIndex, index) {
  var ids;
  var newIndex = lastClickedIndex;
  var idIndex = highlightedIds.findIndex(function (highlightedId) {
    return highlightedId === id;
  });

  if (idIndex >= 0) {
    ids = highlightedIds.slice(0, idIndex).concat(highlightedIds.slice(idIndex + 1));
  } else {
    ids = [].concat((0, _toConsumableArray2.default)(highlightedIds), [id]);
    newIndex = index;
  }

  return {
    ids: ids,
    newIndex: newIndex
  };
};