import React from "react";
import "./Roleshow.css";
import Taskbox from "./Taskbox.jsx";
import Rolebox from "./Rolebox.jsx";

function Roleshow({ workspace_id }) {
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
