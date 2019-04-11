"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _colors = require("../../../modules/colors");

var styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: 53,
    borderBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5
  },
  titleText: {
    color: _colors.colors.greyDark,
    fontSize: 13,
    fontWeight: 300,
    paddingBottom: 10
  },
  dropDown: {
    outline: 'none',
    padding: 0
  },
  dropDownItem: {
    fontSize: 16
  }
};
exports.styles = styles;