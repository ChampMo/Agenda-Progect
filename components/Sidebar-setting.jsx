import React from 'react'
import './Sidebar-setting.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
  return (
    <>
    <div className='sidebar'>
        <div className='top-manu'>
            <div className="text-setting-account">Account</div>
            <div className='setting-sidebar'>
                <div className='setting-task'>Profile</div>
                <div className='setting-Language'>Language</div>
                <div className='setting-Theme'>Theme</div>
            </div>
            <div className="text-setting-Workspace">Workspace</div>
            <div className='setting-sidebar'>
                <div className='setting-Project'>Project</div>
                <div className='setting-People'>People</div>
            </div>
        </div>
        <div className="setting">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Back</div>
    </div>
    </>
  )
}

  export default Sidebar