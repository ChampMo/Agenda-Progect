import React, { useState } from "react";
import "./Taskshow.css";
import Taskbox from "./Taskbox.jsx";
import Addtask from "./Addtask.jsx";

function Taskshow({ workspace_id }) {
  const [atciveaddtask, setAtciveaddtask] = useState(false);
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
  };
  const mytask = () => {
    setClassAlltask("all-task");
    setClassMytask("my-task task-title-active");
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
          <div className="bg-all-taskbox">
            <Taskbox workspace_id={workspace_id}/>
            
          </div>
        </div>
        <div className="add-task-box">
          <div className="add-task" onClick={addtask}>
            Add Task
          </div>
        </div>
      </div>
      {atciveaddtask && <Addtask workspace_id={workspace_id} setAtciveaddtask={setAtciveaddtask} />}
    </>
  );
}

export default Taskshow;
