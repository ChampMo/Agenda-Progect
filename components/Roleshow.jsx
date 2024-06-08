import React from "react";
import "./Roleshow.css";
import Taskbox from "./Taskbox.jsx";
import axios, { all } from "axios";
import { useState, useEffect } from "react";

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
    console.log(allTask)
  }
  return (
    <>
      <div className="role-show">
      
      
      <div className="titleTable">
            <div className="titleTable-name">Task Name</div> 
            <div className="titleTable-cdate">Task Create Date</div> 
            <div className="titleTable-ddate">Task Due Date</div> 
            <div className="titleTable-role">role</div> 
            <div className="titleTable-status">Status</div> 
      </div>
        <div className="all-role">
          {allTask !== undefined && allTask.map((items, index) => (
          <div className="all-role" key={index}>
            <div className="in-role">
              <div className="topic-role">{items.roleName}</div>
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
