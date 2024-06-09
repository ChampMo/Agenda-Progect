import React, { useState } from "react";
import "./Sidebar-setting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


function Sidebar({ setSidebar, setComponentwork, componentwork }) {
  const [sidebarsetting, setSidebarsetting] = useState("sidebarsetting");

  const [classbgbtsetting, setClassbgbtsetting] = useState("bg-bt-setting");
  React.useEffect(() => {
    switch (componentwork) {
      case "Profile":
        setClassbgbtsetting("bg-bt-setting");
        break;
      case "Language":
        setClassbgbtsetting("bg-bt-setting bg-bt-Language");
        break;
      case "Theme":
        setClassbgbtsetting("bg-bt-setting bg-bt-Theme");
        break;

      case "Project":
        setClassbgbtsetting("bg-bt-setting bg-bt-project");
        break;
      case "PeopleRole":
        setClassbgbtsetting("bg-bt-setting bg-bt-People");
        break;
      default:
        null;
    }
  }, [componentwork]);

  const toggleSidebar = () => {
    setSidebarsetting("sidebarsetting backanimetion");
    setComponentwork("Taskshow");
    setTimeout(() => {
      setSidebar(true);
    }, 300);
  };
  return (
    <>
      <div className={sidebarsetting}>
        <div className="top-manu">
          <div className={classbgbtsetting}>
            <div className="p1"></div>
            <div className="p2"></div>
          </div>
          <div className="text-setting-account">Account</div>
          <div className="setting-sidebar">
            <div
              className="setting-profile"
              onClick={() => setComponentwork("Profile")}
            >
              Profile
            </div>
            <div 
            className="setting-Language"
            onClick={() => setComponentwork("Language")}
            >Language
            </div>
            <div 
            className="setting-Theme"
            onClick={() => setComponentwork("Theme")}>Theme</div>
          </div>
          <div className="text-setting-Workspace">Workspace</div>
          <div className="setting-sidebar">
            <div
              className="setting-Project"
              onClick={() => setComponentwork("Project")}
            >
              Project
            </div>
            <div
              className="setting-People"
              onClick={() => setComponentwork("PeopleRole")}
            >
              People & Role
            </div>
          </div>
        </div>
        <div className="setting" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          Back
        </div>
      </div>
    </>
  );
}

export default Sidebar;
