import React, { useState, useEffect } from "react";
import "./Taskbox.css";
import axios from 'axios';


function Taskbox({ workspace_id }) {
  const [numTask, setNumTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/gettask", {
          workspace_id
        });
        setNumTask(response.data.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (workspace_id !== undefined) {
      getTask();
    }
  }, [workspace_id]);

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่
  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // จัดการกรณีที่วันที่เป็น undefined หรือ null
    return new Date(isoDate).toLocaleDateString('en-GB');
  };

  return (
    <>
      {numTask.map((items, index) => (
        <div className="container-task" key={index}>
          <div className="box-task">
            <div>{items.task_name}</div>
            <div>{items.note}</div>
            <div>{formatDate(items.task_create_date)}</div>
            <div>{formatDate(items.task_due_date)}</div>
            <div>{items.status_task}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Taskbox;
