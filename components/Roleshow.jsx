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
  console.log(allTask)
  return (
    <>
      <div className="role-show">
      
      

        {/* <div className="all-role">
          {allTask!==undefined && allTask.map((items, index) => (
          <div className="all-role" key={index}>
            <div className="in-role">
              <div className="topic-role">{items.task_name}</div>
            </div>
            <Taskbox workspace_id={workspace_id} page="Roleshow" />
          </div>
        ))}
          
        </div> */}

        
      </div>
    </>
  );
}

export default Roleshow;
