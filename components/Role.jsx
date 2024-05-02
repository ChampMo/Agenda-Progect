import React, { useState, useEffect } from "react";
import "./Role.css";

function getContrastColor(color) {
  // Split the color string into R, G, and B values
  const rgb = color.match(/\d+/g).map(Number);

  // Calculate the perceived luminance (brightness)
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

  // Set black or white text color based on luminance
  const contrastColor = luminance < 180 ? "white" : "black";

  return contrastColor;
}

function Role(props) {
  const { colorBorder } = props;
  const [color, setColor] = useState(() => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  });
  const contrastColor = getContrastColor(color);

  return (
    <>
      <div
        className="role"
        style={{ backgroundColor: color, border: colorBorder }}
        onClick={props.onClick}
      >
        <span style={{ color: contrastColor }}>champ</span>
      </div>
    </>
  );
}

export default Role;
