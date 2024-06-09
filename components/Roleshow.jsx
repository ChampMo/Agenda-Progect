import React from "react";
import "./Roleshow.css";
import Taskbox from "./Taskbox.jsx";
import axios, { all } from "axios";
import { useState, useEffect } from "react";



function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return 'rgb(' + [r, g, b].join(', ') + ')';
}

function getContrastColor(color) {
  color = hexToRgb(color);

  if (!color || !/^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(color)) {
    return "black";
  }

  const rgb = color.match(/\d+/g).map(Number);

  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;

  const contrastColor = luminance < 0.5 ? "white" : "black";
  return contrastColor;
}




function Roleshow({ workspace_id }) {
  const [allTask, setAllTask] = useState();


  useEffect(() => {
    const getRoleTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/getroletask", {
          workspace_id
        });
        setAllTask(response.data.formattedData)

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (workspace_id !== undefined) {
      getRoleTask();
    }
  }, []);
  if (allTask !== undefined){
    console.log('allTaskallTaskallTask',allTask)
  }
  
  return (
    <>
      <div className="role-show">
      
      
      
        <div className="all-role">
          {allTask !== undefined && allTask.map((items, index) => (

          <div className="all-role" key={index}>
            <div className="in-role">
              <div className="topic-role">
                <div
                className="head_roleName"></div> 
                <div 
                style={{ background: `linear-gradient(to left, transparent, ${items.color})` , color: getContrastColor(items.color)}}
                className="roleName" >{items.roleName}</div> 
              </div>
            </div>
              <div className="titleTable">
              <div className="titleTable-name2">Task Name</div> 
              <div className="titleTable-cdate">Task Create Date</div> 
              <div className="titleTable-ddate">Task Due Date</div> 
              <div className="titleTable-role">role</div> 
              <div className="titleTable-status">Status</div> 
            </div>
            <Taskbox workspace_id={workspace_id} page="Roleshow" tasks = {items.tasks}/>
          </div>
        ))}
          
        </div>

        
      </div>
    </>
  );
}

export default Roleshow;
