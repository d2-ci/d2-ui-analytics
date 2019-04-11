"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = void 0;

// Helper functions
var onError = function onError(error) {
  return console.log('Error: ', error);
};

exports.onError = onError;