'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Fix for vertical flex scrolling in Firefox/Safari:
// Wrap the list in a div with position:relative (and flex:1 instead of on the list)
// On the list, set position:absolute, width:100%, height:100%

var styles = exports.styles = {
    listWrapper: {
        position: 'relative',
        flex: '1 1 0%',
        minHeight: '20vh'
    },
    list: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        padding: '0 8px 0 0',
        marginTop: '0px'
    }
};