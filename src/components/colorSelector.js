import Color from "color-thief-react";
import React from "react";

const ColorSelector = ({ color, colorSelected }) => {
  return (
    <div
      className={`is-clickable selector ${color}-color-selector`}
      onClick={(event) => {colorSelected(event, color)}}
    >
      {" "}
    </div>
  );
};

export default ColorSelector;
