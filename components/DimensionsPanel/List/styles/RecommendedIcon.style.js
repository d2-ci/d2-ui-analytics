"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _colors = require("../../../../modules/colors");

var styles = {
  toolTip: {
    color: _colors.colors.white,
    backgroundColor: '#4a4a4a',
    boxShadow: 'none',
    width: '160px',
    borderRadius: '3px',
    position: 'relative',
    top: '5px',
    fontSize: '12px',
    padding: '7px 9px'
  },
  recommendedIcon: {
    backgroundColor: _colors.colors.accentSecondaryLight,
    height: '8px',
    width: '8px',
    borderRadius: '4px',
    alignSelf: 'center'
  },
  recommendedWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '8px'
  }
};
exports.styles = styles;