import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Sidebar({setSidebar, setComponentwork}) {

  const toggleSidebar= () =>{
    setSidebar(false)
    
  }
  return (
    <>
    <div className='sidebar'>
        <div className='top-manu'>
            <div className='project-info'>
                <div className='profile-project'>

                </div>
                <textarea readOnly className='name-project'>Project name</textarea>
                
            </div>
            <div className='manu-sidebar'>
                <div className='manu-task' onClick={() => setComponentwork('Taskshow')}>Task</div>
                <div className='manu-role' onClick={() => setComponentwork('Roleshow')}>Role</div>
                <div className='manu-schedule' onClick={() => setComponentwork('Scheduleshow')}>Schedule</div>
            </div>
        </div>
        <div className="setting" onClick={toggleSidebar}><FontAwesomeIcon icon={faGear} size="lg" /> Setting</div>
    </div>
    </>
  )
}

  export default Sidebar