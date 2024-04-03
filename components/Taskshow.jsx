import React from 'react'
import './Taskshow.css'

function Taskshow() {
  return (
    <>
    <div className='task-show'>
        <div className='task-box'>
            <div className='filter-task'>
                <div className='all-task'>All Task</div>
                <div className='my-task'>My Task</div>
            </div>
            <div className='container-task'>
                <div className='box-task'>box</div>
            </div>
        </div>
        <div className='add-task-box'>
            <div className='add-task'>Add Task</div>
        </div>
        
    </div>
    </>
  )
}

  export default Taskshow