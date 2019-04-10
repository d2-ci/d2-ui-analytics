import _JSXStyle from "styled-jsx/style";
import React from 'react';

const ItemIcon = ({
  backgroundColor: backgroundColor
}) => {
  return React.createElement("div", {
    className: _JSXStyle.dynamic([["921056640", [backgroundColor]]])
  }, React.createElement(_JSXStyle, {
    id: "921056640",
    dynamic: [backgroundColor]
  }, `div.__jsx-style-dynamic-selector{background-color:${backgroundColor};min-height:6px;min-width:6px;margin:0px 5px;}`));
};

export default ItemIcon;