import React from 'react'
import './Workspace.css'
import Navinwork from '../components/Navinwork.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Taskshow from '../components/Taskshow.jsx'

function Workspace() {


  return (
    <>
    <div className='container-workspace'>
        <Navinwork/>
        <Sidebar/>
        <div className='container-manu-show'>
          <div className='sidebar-box'></div>
          <Taskshow/>
        </div>
        
    </div>
        
    </>
  )
}

export default Workspace