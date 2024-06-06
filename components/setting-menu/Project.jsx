import React from 'react'
import './Project.css'

function Project() {
  return (
    <>
        <div className='project-show'>
                <div className="container-picture-project">
                    <img src='' className='img-project'/>
                </div>
                <div className="info-project">
                    <div className="nameset-project">Project Name :&nbsp;
                      <input className="nameset-info"/>
                    </div>
                    <div className="create-date-project">Create Date : 5 / 8 /2090</div>
                    <div className="amount-task-project">Amount of Task : 5</div>
                    <div className="amount-role-project">Amount of Role : 2</div>
                </div> 
       
        </div>
        
    </>

  )
}

export default Project;