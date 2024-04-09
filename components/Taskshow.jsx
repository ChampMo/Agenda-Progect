import React, { useState } from 'react';
import './Taskshow.css';
import Taskbox from './Taskbox.jsx';
import Addtask from './Addtask.jsx';

function Taskshow() {
  const [atciveaddtask, setAtciveaddtask] = useState(false)
  const addtask =()=>{
    setAtciveaddtask(true)
  }
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
            <div className='add-task' onClick={addtask}>Add Task</div>
        </div>
        
    </div>
    {atciveaddtask && <Addtask setAtciveaddtask={setAtciveaddtask}/>}
    </>
  )
};

  export default Taskshow;