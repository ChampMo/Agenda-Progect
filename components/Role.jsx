import React, { useState, useEffect } from "react";
import "./Role.css";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";

function hexToRgb(hex) {
  // Remove the hash sign if present
  hex = hex.replace(/^#/, '');

  // Convert 3-digit hex to 6-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  // Parse the hexadecimal string to RGB values
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // Return the RGB values in the format "rgb(r, g, b)"
  return 'rgb(' + [r, g, b].join(', ') + ')';
}

function getContrastColor(color) {
  // Convert hexadecimal color to rgb format
  color = hexToRgb(color);

  // Ensure color is defined and in the correct format
  if (!color || !/^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(color)) {
    console.log("Invalid color format:", color);
    return "black"; // Default to black if the color is invalid
  }

  // Split the color string into R, G, and B values
  const rgb = color.match(/\d+/g).map(Number);

  // Calculate the perceived luminance (brightness)
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;

  // Set black or white text color based on luminance
  const contrastColor = luminance < 0.5 ? "white" : "black";
  console.log(`Color: ${color}, Luminance: ${luminance}, Contrast color: ${contrastColor}`);
  return contrastColor;
}

function Role({ workspace_id }) {
  const [roleInfo, setRoleInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/getrole", {
          workspace_id,
          withCredentials: true,
        });
        setRoleInfo(response.data.role || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workspace_id !== undefined) {
      getRole();
    }
  }, [workspace_id]);

  return (
    <>
      {loading ? (
        <div className="bg-loading">
          <DotLoader
            color="#2960cd"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        roleInfo.length > 0 ? (
          roleInfo.map((items, index) => (
            <div
              className="role"
              key={index}
              style={{ backgroundColor: items.color || "gray" }} // Default background color if items.color is undefined
            >
              <span style={{ color: getContrastColor(items.color) }}>
                {items.role_name}
              </span>
            </div>
          ))
        ) : (
          <div className="no-roles">No roles found</div>
        )
      )}
    </>
  );
}

export default Role;
