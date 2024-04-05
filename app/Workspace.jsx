import React from 'react'
import './Workspace.css'
import Navinwork from '../components/Navinwork.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Taskshow from '../components/Taskshow.jsx'
import Roleshow from '../components/Roleshow.jsx'
import SidebarSetting from '../components/Sidebar-setting.jsx'
import Profile from '../components/setting-manu/Profile.jsx'
import Project from '../components/setting-manu/Project.jsx'


function Workspace() {


  return (
    <>
    <div className='container-workspace'>
        <Navinwork/>
        {/* <Sidebar/> */}
        <SidebarSetting/>
        <div className='container-manu-show'>
          <div className='sidebar-box'></div>

          {/* <Taskshow/> */}
          {/* <Roleshow/> */}
          {/* <Profile/> */}
          <Project/>
        </div>
        
    </div>
        
    </>
  )
}

export default Workspace