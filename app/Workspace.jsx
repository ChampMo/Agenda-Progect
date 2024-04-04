import React from 'react'
import './Workspace.css'
import Navinwork from '../components/Navinwork.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Taskshow from '../components/Taskshow.jsx'
import Roleshow from '../components/Roleshow.jsx'
import SidebarSetting from '../components/Sidebar-setting.jsx'


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
          <Roleshow/>
        </div>
        
    </div>
        
    </>
  )
}

export default Workspace