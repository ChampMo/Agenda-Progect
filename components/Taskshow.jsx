import React from 'react';
import './Taskshow.css';
import Taskbox from './Taskbox.jsx';
import Addtask from './Addtask.jsx';

function Taskshow() {
  return (
    <>
    <div className='task-show'>
        <div className='task-box'>
            <div className='filter-task'>
                <div className='all-task'>All Task</div>
                <div className='my-task'>My Task</div>
            </div>
            <Taskbox/>
        </div>
        <div className='add-task-box'>
            <div className='add-task'>Add Task</div>
        </div>
        
    </div>
    {/* <Addtask/> */}
    </>
  )
};

  export default Taskshow;