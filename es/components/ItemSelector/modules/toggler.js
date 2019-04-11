"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggler = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    ids = [].concat(_toConsumableArray(highlightedIds), [id]);
    newIndex = index;
  }

  return {
    ids: ids,
    newIndex: newIndex
  };
};