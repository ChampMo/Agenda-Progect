import React,{useState} from "react";
import './ChangePass.css';
import axios from 'axios';

function ChangePass({setAtcivecpass}){
    const [classcomponentcpass, setClasscomponentcpass] = useState('component-cpass');
    const setAtcivecpassfalse =()=>{
        setClasscomponentcpass('component-cpass animation-cpass-reverse')
        setTimeout(() => {
            setAtcivecpass(false)
        }, 200);
    }
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [notpass, setNotpass] = useState(false)
    const [passNotMatch, setPassNotMatch] = useState('');

    const handleChamgePass = async (e) => {
        e.preventDefault();
        if(newPassword === reNewPassword && newPassword.length >= 6){
            setNotpass(false)
            try {
                await axios.put("http://localhost:8000/changepassword",{
                    oldPassword,
                    newPassword
                })
                .then((response) => {
                    console.log(response.data);
                    if(response.data.success){
                        setAtcivecpass(false)
                    }else{
                        setNotpass(true)
                        setPassNotMatch('Invalid old password!')
                    }
                    
                })
                .catch((error) => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error);
            }
        }else if(newPassword !== reNewPassword){
            setNotpass(true)
            setPassNotMatch('Password not match!')
        }else{
            setNotpass(true)
            setPassNotMatch('Password must be at least 6 characters!')
        }
    }

    return(
        <>
            <div className='bgcomponent-cpass'></div>
                <div className={classcomponentcpass} onClick={setAtcivecpassfalse}>
                <div className='bg-back-cpass' onClick={(innerClickEvent) => {
                        innerClickEvent.stopPropagation();
                    }}>
                    <div className='bg-front-cpass'></div>
                    <form 
                    onSubmit={handleChamgePass}
                    className="component-add-cpass">
                        <div className="box-cpass">
                            <div className="text-oldp">Old Password</div>
                            <input className="input-oldp" type="text" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                            <div className="text-newp">New Password</div>
                            <input className="input-newp" type="password"  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                            <div className="text-renewp">Re-New Password</div>
                            <input className="input-renewp" type="password"  value={reNewPassword} onChange={(e)=>setReNewPassword(e.target.value)}/>
                            {notpass && <div className="passnotmatch">{passNotMatch}</div>}
                        </div>
                        <div className="bg-bt-cpass">
                            <button type='submit' className='bt-cpass'>Change Password</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
};

export default ChangePass;