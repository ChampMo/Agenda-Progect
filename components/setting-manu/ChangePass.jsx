import React,{useState} from "react";
import './ChangePass.css';

function ChangePass({setAtcivecpass}){
    const [classcomponentcpass, setClasscomponentcpass] = useState('component-cpass');
    const setAtcivecpassfalse =()=>{
        setClasscomponentcpass('component-cpass animation-cpass-reverse')
        setTimeout(() => {
            setAtcivecpass(false)
        }, 200);
    }
    return(
        <>
            <div className='bgcomponent-cpass'></div>
                <div className={classcomponentcpass} onClick={setAtcivecpassfalse}>
                <div className='bg-back-cpass' onClick={(innerClickEvent) => {
                        innerClickEvent.stopPropagation();
                    }}>
                    <div className='bg-front-cpass'></div>
                    <div className="component-add-cpass">
                        <div className="box-cpass">
                            <div className="text-oldp">Old Password</div>
                            <input className="input-oldp" type="text" />
                            <div className="text-reoldp">Re-Old Password</div>
                            <input className="input-reoldp" type="text" />
                            <div className="text-newp">New Password</div>
                            <input className="input-newp" type="text" />
                        </div>
                        <div className="bg-bt-cpass">
                            <div type='submit' className='bt-cpass'>Change Password</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChangePass;