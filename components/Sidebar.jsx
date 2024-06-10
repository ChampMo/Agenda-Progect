import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import bgbtworkspace from "../public/images/bg-bt-workspace.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { axiosinstant } from "../lib/axiosinstant";
function Sidebar({ setSidebar, setComponentwork, componentwork, workspace_id, loadInfo }) {
  const [classTask, setClassTask] = useState("manu-task");
  const [classRole, setClassRole] = useState("manu-role");
  const [classSche, setClassSche] = useState("manu-schedule");
  const [classbgbt, setClassbgbt] = useState("bg-bt-sidebar");
  const [workspaceInfo, setWorkspaceInfo] = useState([]);
  const [loadInfoname, setLoadInfoname] = useState(false);
  const [workspace_name, setWorkspace_name] = useState("");

  React.useEffect(() => {
    switch (componentwork) {
      case "Taskshow":
        setClassbgbt("bg-bt-sidebar");
        setTimeout(() => {
          setClassTask("manu-task col-white");
          setClassRole("manu-role");
          setClassSche("manu-schedule");
        }, 100);

        break;
      case "Roleshow":
        setClassbgbt("bg-bt-sidebar bg-bt-role");
        setTimeout(() => {
          setClassTask("manu-task");
          setClassRole("manu-role col-white");
          setClassSche("manu-schedule");
        }, 100);
        break;
      case "Scheduleshow":
        setClassbgbt("bg-bt-sidebar bg-bt-schedule");
        setTimeout(() => {
          setClassTask("manu-task");
          setClassRole("manu-role");
          setClassSche("manu-schedule col-white");
        }, 100);
        break;
      default:
        null;
    }
  }, [componentwork]);

  const toggleSidebar = () => {
    setComponentwork("Profile");
    setSidebar(false);
  };


  useEffect(() => {
    const fetchAllWork = async () => {
      axiosinstant.post("/api/workspaceinfo",{ 
          withCredentials: true,
          workspace_id
        })
            .then((response) => {
            setWorkspaceInfo(response.data.workspaceInfo);

            })
            .catch((error) => {
            console.error(error);
            });
    }
    fetchAllWork();
  }, [loadInfoname, loadInfo]);








  return (
    <>
      <div className="sidebar">
        <div className="top-manu">
          <div className="project-info">
            <div className="profile-project">
              <img src={workspaceInfo!==null?workspaceInfo.workspace_icon:''} className="img-profile-workspace" />
            </div>
            <input readOnly value={workspaceInfo!==undefined?workspaceInfo.workspace_name:''} className="name-project"/>
          </div>
          <div className="manu-sidebar">
            <div className={classbgbt}>
              <img className="bgbtworkspace" src={bgbtworkspace} />
            </div>
            <div
              className={classTask}
              onClick={() => setComponentwork("Taskshow")}
            >
              Task
            </div>
            <div
              className={classRole}
              onClick={() => setComponentwork("Roleshow")}
            >
              Role
            </div>
            <div
              className={classSche}
              onClick={() => setComponentwork("Scheduleshow")}
            >
              Schedule
            </div>
          </div>
        </div>
        <div className="setting" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faGear} size="lg" /> Setting
        </div>
      </div>
    </>
  );
}

export default Sidebar;
