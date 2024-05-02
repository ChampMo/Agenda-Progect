import React, { useState } from "react";
import "./Workspace.css";
import Navinwork from "../components/Navinwork.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Taskshow from "../components/Taskshow.jsx";
import Roleshow from "../components/Roleshow.jsx";
import Scheduleshow from "../components/Scheduleshow.jsx";
import SidebarSetting from "../components/Sidebar-setting.jsx";
import Profile from "../components/setting-manu/Profile.jsx";
import Project from "../components/setting-manu/Project.jsx";
import PeopleRole from "../components/setting-manu/PeopleRole.jsx";

function Workspace() {
  const [sidebar, setSidebar] = useState(true);
  const [componentwork, setComponentwork] = useState("Taskshow");
  const renderActiveComponent = () => {
    switch (componentwork) {
      case "Taskshow":
        return <Taskshow />;
      case "Roleshow":
        return <Roleshow />;
      case "Scheduleshow":
        return <Scheduleshow />;
      case "Profile":
        return <Profile />;
      case "Project":
        return <Project />;
      case "PeopleRole":
        return <PeopleRole />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="container-workspace">
        <Navinwork />
        <Sidebar
          setSidebar={setSidebar}
          setComponentwork={setComponentwork}
          componentwork={componentwork}
        />
        {sidebar ? null : (
          <SidebarSetting
            setSidebar={setSidebar}
            setComponentwork={setComponentwork}
            componentwork={componentwork}
          />
        )}
        <div className="container-manu-show">
          <div className="sidebar-box"></div>
          {/* <Taskshow/> */}
          {/* <Roleshow/> */}
          {/* <Profile/> */}
          {/* <Project/> */}
          {/* <PeopleRole/> */}
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
}

export default Workspace;
