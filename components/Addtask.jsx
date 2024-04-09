import react,{useState} from 'react';
import './Addtask.css';

function Addtask({setAtciveaddtask}){
    const [classcomponentaddtask, setClasscomponentaddtask] = useState('component-addtask');
    const setAtciveaddtaskfalse =()=>{
        setClasscomponentaddtask('component-addtask animation-addtask-reverse')
        setTimeout(() => {
            setAtciveaddtask(false)
        }, 200);
    }
    return(
        <>
        <div className='bgcomponent-addtask'></div>
        <div className={classcomponentaddtask} onClick={setAtciveaddtaskfalse}>
            <div className='bg-back-addtask' onClick={(innerClickEvent) => {
                    innerClickEvent.stopPropagation();
                }}>
                <div className='bg-front-addtask'></div>
                <div className="component-add">
                    <div className="bgaddt">
                        <input className="taskname" placeholder='Task Name'/>
                    </div>
                    <div className="bgaddt-note">
                        <textarea placeholder='Note' className="note"></textarea>
                    </div>
                    <div className="bgaddt">
                        <div className="text-duedate">Due Date :</div>
                        <input type='date' className="duedate"/>
                    </div>
                    <div className="bgaddt">
                        <div className="text-role">Role </div>
                        <div className="role-box">
                            <div className="role-item">dddddddddddddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div><div className="role-item">ddddddddddgrgsegsegsdddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div>
                            <div className="role-item">ddddddddddgrgsegsegsdddd</div>
                        </div>
                    </div>
                    <div className="bgaddt">
                        <div className="text-status">Status </div>
                        <div className="not-start-status">Not Start</div>
                        <div className="in-progress-status">In Progress</div>
                        <div className="done-status">Done</div>
                    </div>
                    <div className="bg-bt-addtask">
                        <div type='submit' className='bt-addtask'>Add Task</div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
};

export default Addtask;