import React, { useState, useEffect } from "react";
import "./Taskbox.css";
import axios from 'axios';
import Role from './Role.jsx';
import Addtask from "./Addtask.jsx";
import { axiosinstant } from "../lib/axiosinstant";

function Taskbox({ workspace_id, loadInfo, setLoadInfo, stateTask, myTask, selectShow, page, tasks}) {
  const [numTask, setNumTask] = useState([]);
  const [loadInfoRole, setLoadInfoRole] = useState(false);
  const [roleTask, setRoleTask] = useState([]);
  const [task, setTask] = useState([]);
  const [atciveaddtask, setAtciveaddtask] = useState(false);

    useEffect(() => {
      const getTask = async () => {
        try {
          const response = await axiosinstant.post("/api/gettask", {
            workspace_id
          });
          if( stateTask ){
            const updatedNumTask = response.data.task.filter(task => selectShow.includes(task.status_task));
            setNumTask(updatedNumTask);
            setLoadInfoRole(p=>!p)
          }else{
            if(myTask !== undefined){
              const updatedNumTask = response.data.task.filter(task => myTask.includes(task.task_id));
              const updatedNumTask2 = updatedNumTask.filter(task => selectShow.includes(task.status_task));
              setNumTask(updatedNumTask2);
              setLoadInfoRole(p=>!p)
            }else{
              setNumTask([]);
              setLoadInfoRole(p=>!p)
            }

            
          }

        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      if (workspace_id !== undefined) {
        if(page === "Roleshow"){
          setNumTask(tasks)
        }else{
          getTask();
        }
      }
    }, [workspace_id, loadInfo, stateTask, myTask, selectShow]);
  
  
console.log(numTask)
  // ฟังก์ชันสำหรับจัดรูปแบบวันที่
  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // จัดการกรณีที่วันที่เป็น undefined หรือ null
    return new Date(isoDate).toLocaleDateString('en-GB');
  };

  const handleEditTask = (items) => {
    setTask(items);
    setAtciveaddtask(true);
  };

console.log('numtask',numTask)

  return (
    <>
      {numTask.length === 0 ? <div className="no-task">{stateTask?"Don't have a task yet.":"You don't have a task yet."}</div>:
      page !== "Roleshow" ? numTask.map((items, index) => (
        <div 
        onClick={() => handleEditTask(items)}
        className="container-task" key={index}>
          <div className="box-task">
            <div className="container-item">
              <div className="item-name">{items.task_name}</div>
              <div className="item-task_create_date">{formatDate(items.task_create_date)}</div>
              <div className="item-task_due_date">{formatDate(items.task_due_date)}</div>
            </div>
            <div className="container-item2">
              <div className="item-role">
                <Role  
                    workspace_id = {workspace_id}
                    page='alltask'
                    data={items.task_id}
                    loadInfoRole={loadInfoRole}
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
        </div>
      )) : numTask.map((items, index) => (
        <div 
        onClick={() => handleEditTask(items)}
        className="container-task" key={index}>
          <div className="box-task">
          <div className="container-item">
              <div className="item-name">{items.task_name}</div>
              <div className="item-task_create_date">{formatDate(items.task_create_date)}</div>
              <div className="item-task_due_date">{formatDate(items.task_due_date)}</div>
            </div>
            <div className="container-item2">
              <div className="item-role">
                <Role
                    workspace_id = {workspace_id}
                    page='alltask'
                    data={items.task_id}
                    loadInfoRole={loadInfoRole}
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
        </div>
      ))
      }
      {atciveaddtask && <Addtask workspace_id={workspace_id} setAtciveaddtask={setAtciveaddtask} setLoadInfo={setLoadInfo} task={task} page2='EditTask'/>}

    </>
  );
}

export default Taskbox;
