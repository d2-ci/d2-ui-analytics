"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _colors = require("../../../../modules/colors");

var styles = {
  text: {
    color: _colors.colors.black,
    userSelect: 'none',
    cursor: 'pointer',
    wordBreak: 'break-word',
    fontSize: '14px',
    maxWidth: '195px',
    alignSelf: 'center'
  },
  textDeactivated: {
    cursor: 'auto',
    color: _colors.colors.grey
  },
  listItem: {
    display: 'flex',
    height: 24,
    marginTop: 3,
    marginBottom: 3
  },
  selectedListItem: {
    backgroundColor: _colors.colors.accentSecondaryTransparent,
    fontWeight: 500
  },
  fixedDimensionIcon: {
    paddingLeft: '6px',
    paddingBottom: '2px'
  },
  dynamicDimensionIcon: {
    paddingLeft: '9px',
    paddingRight: '9px'
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: '8px',
    paddingLeft: '8px'
  },
  optionsWrapper: {
    position: 'relative',
    height: '24px',
    left: '5px',
    alignSelf: 'center'
  },
  optionsButton: {
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '1px 0px 0px 0px'
  }
};
exports.styles = styles;