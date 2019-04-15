"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SelectedItems = require("../SelectedItems");

describe('The SelectedItems component', function () {
  var props;
  var selectedItemsWrapper;

  var selectedItems = function selectedItems() {
    if (!selectedItemsWrapper) {
      selectedItemsWrapper = (0, _enzyme.mount)(_react.default.createElement(_SelectedItems.SelectedItems, props));
    }

    return selectedItemsWrapper;
  };

  beforeEach(function () {
    props = {
      items: [],
      onDeselect: jest.fn(),
      onReorder: jest.fn()
    };
    selectedItemsWrapper = undefined;
  });
  it('matches the snapshot when list is empty', function () {
    expect(selectedItems()).toMatchSnapshot();
  });
  describe('list with items', function () {
    beforeEach(function () {
      props.items = [{
        id: 'rb',
        name: 'rainbow'
      }, {
        id: 'rr',
        name: 'rarity'
      }];
    });
    it('matches the snapshot with list has items', function () {
      expect(selectedItems()).toMatchSnapshot();
    });
    it('triggers onDeselect when item double-clicked', function () {
      selectedItems().find('li').first().simulate('doubleClick');
      expect(props.onDeselect).toHaveBeenCalled();
      expect(props.onDeselect).toHaveBeenCalledWith(['rb']);
    });
    it('triggers onDeselect when Deselect All button clicked', function () {
      selectedItems().find('Button').first().simulate('click');
      expect(props.onDeselect).toHaveBeenCalled();
      expect(props.onDeselect).toHaveBeenCalledWith(['rb', 'rr']);
    });
    it('triggers onDeselect when "Deselect highlighted" button clicked', function () {
      var list = selectedItems();
      list.find('Item').first().simulate('click', false, false, 0, 'rb');
      var onClickFn = list.find('ArrowButton').prop('onClick');
      onClickFn(); // enzyme simulate was not working

      expect(props.onDeselect).toHaveBeenCalled();
      expect(props.onDeselect).toHaveBeenCalledWith(['rb']);
    });
  });
});