import React, { useState, useEffect } from "react";
import "./Taskbox.css";
import axios from 'axios';
import Role from './Role.jsx';

function Taskbox({ workspace_id, loadInfo, stateTask, myTask}) {
  const [numTask, setNumTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/gettask", {
          workspace_id
        });
        if( stateTask ){
          setNumTask(response.data.task);
        }else{
          const updatedNumTask = response.data.task.filter(task => myTask.includes(task.task_id));
          setNumTask(updatedNumTask);
          console.log(numTask)
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (workspace_id !== undefined) {
      getTask();
    }
  }, [workspace_id, loadInfo, stateTask, myTask]);

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่
  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // จัดการกรณีที่วันที่เป็น undefined หรือ null
    return new Date(isoDate).toLocaleDateString('en-GB');
  };

  return (
    <>
      {numTask.length === 0 ? <div className="no-task">{stateTask?"Don't have a job yet.":"You don't have a job yet."}</div>:
      numTask.map((items, index) => (
        <div className="container-task" key={index}>
          <div className="box-task">
            <div className="item-name">{items.task_name}</div>
            <div className="item-task_create_date">{formatDate(items.task_create_date)}</div>
            <div className="item-task_due_date">{formatDate(items.task_due_date)}</div>
            <div className="item-role">
              <Role  
                  workspace_id = {workspace_id}
                  page='alltask'
                  data={items.task_id}
              />
            </div>
            <div className="item-status_task">
              {items.status_task === 'not-start-status'&&
              <div className="not-start-status">
                  Not Start
              </div>}
              {items.status_task === 'in-progress-status'&&
              <div className="in-progress-status">
                  In Progress
              </div>}
              {items.status_task === 'done-status'&&
              <div className="done-status">
                  Done
              </div>}
            </div>
          </div>
        </div>
      ))}
      {stateTask? <div></div> : <div></div> }
    </>
  );
}

export default Taskbox;
