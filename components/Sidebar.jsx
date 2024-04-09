import React, { useState } from 'react'
import './Sidebar.css'
import bgbtworkspace from '../public/images/bg-bt-workspace.png'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Sidebar({setSidebar, setComponentwork, componentwork}) {

  const [classTask, setClassTask] = useState('manu-task');
  const [classRole, setClassRole] = useState('manu-role');
  const [classSche, setClassSche] = useState('manu-schedule');
  const [classbgbt, setClassbgbt] = useState('bg-bt-sidebar');

  React.useEffect(() => {
    switch (componentwork) {
      case 'Taskshow':
        setClassbgbt('bg-bt-sidebar');
        setTimeout(() => {
          setClassTask('manu-task col-white');
          setClassRole('manu-role');
          setClassSche('manu-schedule');
        }, 100);
        
        break;
      case 'Roleshow':
        setClassbgbt('bg-bt-sidebar bg-bt-role');
        setTimeout(() => {
        setClassTask('manu-task');
        setClassRole('manu-role col-white');
        setClassSche('manu-schedule');
        }, 100);
        break;
      case 'Scheduleshow':
      setClassbgbt('bg-bt-sidebar bg-bt-schedule');
      setTimeout(() => {
        setClassTask('manu-task');
        setClassRole('manu-role');
        setClassSche('manu-schedule col-white');
        }, 100);
        break;
      default:
        null;
    }
  }, [componentwork]);

  const toggleSidebar= () =>{
    setComponentwork('Profile')
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
                <div className={classbgbt}><img className='bgbtworkspace' src={bgbtworkspace}/></div>
                <div className={classTask} onClick={() => setComponentwork('Taskshow')}>Task</div>
                <div className={classRole} onClick={() => setComponentwork('Roleshow')}>Role</div>
                <div className={classSche} onClick={() => setComponentwork('Scheduleshow')}>Schedule</div>
            </div>
        </div>
        <div className="setting" onClick={toggleSidebar}><FontAwesomeIcon icon={faGear} size="lg" /> Setting</div>
    </div>
    </>
  )
}

  export default Sidebar