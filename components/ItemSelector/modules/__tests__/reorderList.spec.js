"use strict";

var _reorderList = require("../reorderList");

var items = [{
  id: '1 rarity'
}, {
  id: '2 rainbow'
}, {
  id: '3 fluttershy'
}, {
  id: '4 pinkie'
}, {
  id: '5 applejack'
}, {
  id: '6 spike'
}];
describe('reorderList', function () {
  var props = {
    items: items,
    highlightedItemIds: [],
    destinationIndex: 0,
    sourceIndex: 0,
    draggableId: ''
  };
  beforeEach(function () {
    props.highlightedItemIds = [];
  });
  describe('single item drag', function () {
    beforeEach(function () {
      props.isMultiDrag = false;
    });
    it('moves 1st item to 5th position', function () {
      props.highlightedItemIds = [items[0].id];
      props.draggableId = items[0].id;
      props.sourceIndex = 0;
      props.destinationIndex = 4;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['2 rainbow', '3 fluttershy', '4 pinkie', '5 applejack', '1 rarity', '6 spike'];
      expect(result).toEqual(expected);
    });
    it('moves last item to 3rd position', function () {
      props.highlightedItemIds = [items[5].id];
      props.draggableId = items[5].id;
      props.sourceIndex = 5;
      props.destinationIndex = 2;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['1 rarity', '2 rainbow', '6 spike', '3 fluttershy', '4 pinkie', '5 applejack'];
      expect(result).toEqual(expected);
    });
  });
  describe('multi item drag', function () {
    beforeEach(function () {
      props.isMultiDrag = true;
    });
    it('moves first two items to 3rd position', function () {
      props.highlightedItemIds = [items[0].id, items[1].id];
      props.draggableId = items[0].id;
      props.sourceIndex = 0;
      props.destinationIndex = 4;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['3 fluttershy', '4 pinkie', '1 rarity', '2 rainbow', '5 applejack', '6 spike'];
      expect(result).toEqual(expected);
    });
    it('moves first two items to 5th (2nd to last) position', function () {
      props.highlightedItemIds = [items[0].id, items[1].id];
      props.draggableId = items[0].id;
      props.sourceIndex = 0;
      props.destinationIndex = 5;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['3 fluttershy', '4 pinkie', '5 applejack', '1 rarity', '2 rainbow', '6 spike'];
      expect(result).toEqual(expected);
    });
    it('moves first two items to last position', function () {
      props.highlightedItemIds = [items[0].id, items[1].id];
      props.draggableId = items[0].id;
      props.sourceIndex = 0;
      props.destinationIndex = 6;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['3 fluttershy', '4 pinkie', '5 applejack', '6 spike', '1 rarity', '2 rainbow'];
      expect(result).toEqual(expected);
    });
    it('moves last two items to 3rd position', function () {
      props.highlightedItemIds = [items[4].id, items[5].id];
      props.draggableId = items[4].id;
      props.sourceIndex = 5;
      props.destinationIndex = 2;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['1 rarity', '2 rainbow', '5 applejack', '6 spike', '3 fluttershy', '4 pinkie'];
      expect(result).toEqual(expected);
    });
    it('moves second and sixth items to 4th position', function () {
      props.highlightedItemIds = [items[1].id, items[5].id];
      props.draggableId = items[1].id;
      props.sourceIndex = 1;
      props.destinationIndex = 4;
      var result = (0, _reorderList.reorderList)(props);
      var expected = ['1 rarity', '3 fluttershy', '4 pinkie', '2 rainbow', '6 spike', '5 applejack'];
      expect(result).toEqual(expected);
    });
  });
});