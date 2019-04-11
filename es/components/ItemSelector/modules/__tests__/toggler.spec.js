"use strict";

var _toggler = require("../toggler");

describe('using the toggler ', function () {
  var id;
  var isCtrlPressed;
  var isShiftPressed;
  var index;
  var lastClickedIndex;
  var highlightedIds;
  var items;
  describe('with only mouse click', function () {
    beforeEach(function () {
      id = 'id';
      isCtrlPressed = false;
      isShiftPressed = false;
      index = 1;
      lastClickedIndex = 0;
      highlightedIds = ['stuff', 'here'];
      items = ['some', 'id', 'strings'];
    });
    it('should not add duplicate items', function () {
      id = 'some';
      var expectedResult = {
        ids: [id],
        lastClickedIndex: index
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toStrictEqual(expectedResult);
    });
    it('should update the lastClickedIndex', function () {
      var expectedResult = {
        ids: id,
        lastClickedIndex: index
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult.lastClickedIndex).toEqual(expectedResult.lastClickedIndex);
    });
    it('should remove all items and replace the contens with only the given value (id)', function () {
      var expectedResult = {
        ids: [id],
        lastClickedIndex: index
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('with shift key pressed', function () {
    beforeEach(function () {
      id = 'ones';
      isCtrlPressed = false;
      isShiftPressed = true;
      index = 1;
      lastClickedIndex = 0;
      highlightedIds = ['ones', 'stuff', 'here'];
      items = ['ones', 'some', 'id', 'strings', 'stuff', 'here', 'as', 'well'];
    });
    it('should not update the lastClickedIndex', function () {
      var expectedResult = {
        ids: items,
        lastClickedIndex: lastClickedIndex
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult.lastClickedIndex).toStrictEqual(expectedResult.lastClickedIndex);
    });
    it('should keep the highlighted ids and not add duplicate items', function () {
      var expectedResult = {
        ids: ['some', 'ones', 'stuff', 'here'],
        lastClickedIndex: lastClickedIndex
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toEqual(expectedResult);
    });
    it('should add items from lastClickedIndex to current index into the array', function () {
      var expectedResult = {
        ids: ['some', 'ones', 'stuff', 'here'],
        lastClickedIndex: lastClickedIndex
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toEqual(expectedResult);
    });
  });
  describe('with meta key pressed', function () {
    beforeEach(function () {
      id = 'ones';
      isCtrlPressed = true;
      isShiftPressed = false;
      index = 0;
      lastClickedIndex = 2;
      highlightedIds = ['stuff', 'here'];
      items = ['ones', 'stuff', 'here'];
    });
    it('should not add duplicate items', function () {
      id = 'stuff';
      var expectedResult = {
        ids: ['here'],
        lastClickedIndex: lastClickedIndex
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toStrictEqual(expectedResult);
    });
    it('should be able to add one item and update the lastClickedIndex', function () {
      var expectedResult = {
        ids: highlightedIds.concat(id),
        lastClickedIndex: index
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toStrictEqual(expectedResult);
    });
    it('should be able to remove one item without updating lastClickedIndex', function () {
      id = 'here';
      var expectedResult = {
        ids: ['stuff'],
        lastClickedIndex: lastClickedIndex
      };
      var actualResult = (0, _toggler.toggler)(id, isCtrlPressed, isShiftPressed, index, lastClickedIndex, highlightedIds, items);
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});