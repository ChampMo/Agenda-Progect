import React, { useState } from "react";
import "./Taskshow.css";
import Taskbox from "./Taskbox.jsx";
import Addtask from "./Addtask.jsx";

function Taskshow({ workspace_id }) {
  const [loadInfo, setLoadInfo] = useState(false);
  const [atciveaddtask, setAtciveaddtask] = useState(false);
  const [stateTask, setStateTask] = useState(true);
  const [classAlltask, setClassAlltask] = useState(
    "all-task  task-title-active"
  );
  const [classMytask, setClassMytask] = useState("my-task");
  const addtask = () => {
    setAtciveaddtask(true);
  };
  const alltask = () => {
    setClassAlltask("all-task task-title-active");
    setClassMytask("my-task");
    setLoadInfo(p => !p);
    setStateTask(true);
  };
  const mytask = () => {
    setClassAlltask("all-task");
    setClassMytask("my-task task-title-active");
    setLoadInfo(p => !p);
    setStateTask(false);
  };
  return (
    <>
      <div className="task-show">
        <div className="task-box">
          <div className="filter-task">
            <div className={classAlltask} onClick={alltask}>
              All Task
            </div>
            <div className={classMytask} onClick={mytask}>
              My Task
            </div>
          </div>
          <div className="titleTable">
            <div className="titleTable-name">Task Name</div> 
            <div className="titleTable-cdate">Task Create Date</div> 
            <div className="titleTable-ddate">Task Due Date</div> 
            <div className="titleTable-role">role</div> 
            <div className="titleTable-status">Status</div> 
          </div>
          <div className="bg-all-taskbox">
            <Taskbox workspace_id={workspace_id} loadInfo={loadInfo} setLoadInfo={setLoadInfo} stateTask={stateTask}/>
            
          </div>
        </div>
        <div className="add-task-box">
          <div className="add-task" onClick={addtask}>
            Add Task
          </div>
        </div>
      </div>
      {atciveaddtask && <Addtask workspace_id={workspace_id} setAtciveaddtask={setAtciveaddtask} setLoadInfo={setLoadInfo}/>}
    </>
  );
}

export default Taskshow;
