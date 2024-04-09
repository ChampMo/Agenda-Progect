import React, {useState} from 'react'
import './Sidebar-setting.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function Sidebar({setSidebar, setComponentwork}) {
  const [sidebarsetting, setSidebarsetting] = useState('sidebarsetting')

  const toggleSidebar= () =>{
    setSidebarsetting('sidebarsetting backanimetion')
    setTimeout(() => {
      setSidebar(true)
    }, 300);
    
  }
  return (
    <>
    <div className={sidebarsetting}>
        <div className='top-manu'>
            <div className="text-setting-account">Account</div>
            <div className='setting-sidebar'>
                <div className='setting-task' onClick={() => setComponentwork('Profile')}>Profile</div>
                <div className='setting-Language'>Language</div>
                <div className='setting-Theme'>Theme</div>
            </div>
            <div className="text-setting-Workspace">Workspace</div>
            <div className='setting-sidebar'>
                <div className='setting-Project' onClick={() => setComponentwork('Project')}>Project</div>
                <div className='setting-People' onClick={() => setComponentwork('PeopleRole')}>People</div>
            </div>
        </div>
        <div className="setting" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Back
        </div>
    </div>
    </>
  )
}

  export default Sidebar