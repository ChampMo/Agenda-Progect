import React from "react";
import "./Role.css";
import { useState, useEffect } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";

function getContrastColor(color) {
  // Split the color string into R, G, and B values
  const rgb = color.match(/\d+/g).map(Number);

  // Calculate the perceived luminance (brightness)
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

  // Set black or white text color based on luminance
  const contrastColor = luminance < 180 ? "white" : "black";

  return contrastColor;
}

function Role({ workspace_id }) {
  const getContrastColorForItem = (items) => getContrastColor(items.color);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState([])
  useEffect(()=>{
    const getRole = async () => {
        await axios.post("http://localhost:8000/api/getrole",{
            workspace_id,
            withCredentials: true
        })
        .then((response) => {
            setRoleInfo(response.data.role);
            setLoading(false);
        })
    }
    if (workspace_id!==undefined){
      getRole()
    }

}, [workspace_id])

console.log(roleInfo);
  return (
    <>
      {loading ?
      <div className="bg-loading">
        <DotLoader
        color="#2960cd"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
      </div>
      :
      (roleInfo.length > 0 ? 
      roleInfo.map((items, index) => (
        <div
          className="role"
          key={index}
          style={{ backgroundColor: items.color }}
        >
          <span style={{ color: getContrastColorForItem(items) }}>
            {items.role_name}
          </span>
        </div>
        
      ))
      :
      <div></div>)}
    </>
  );
}

export default Role;
