"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _colors = require("../../modules/colors");

var styles = {
  container: {
    border: "1px solid ".concat(_colors.colors.greyLight),
    backgroundColor: _colors.colors.white,
    height: '39px',
    borderRight: '0px',
    borderLeft: '0px',
    borderTop: '0px'
  },
  textField: {
    paddingRight: '7px',
    paddingTop: '5px',
    width: '100%',
    fontSize: '14px'
  }
};
exports.styles = styles;