import React from "react";
import "./Roleshow.css";
import Taskbox from "./Taskbox.jsx";
import axios from "axios";
import { useState, useEffect } from "react";

function Roleshow({ workspace_id }) {
  const [data, setData] = useState('');

  useEffect(() => {
    const getRoleTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/getroletask", {
          task_id
        });

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (workspace_id !== undefined) {
      getRoleTask();
    }
  }, []);

  return (
    <>
      <div className="role-show">

        <div className="all-role">
          <div className="in-role">
            <div className="topic-role">Role 1</div>
          </div>
          <Taskbox workspace_id = {workspace_id}/>
        </div>

        
      </div>
    </>
  );
}

export default Roleshow;
