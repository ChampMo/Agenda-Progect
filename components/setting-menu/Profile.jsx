import React,{useState} from 'react'
import './Profile.css'
import ChangePass from './ChangePass.jsx'

function Profile() {
  const [atcivecpass, setAtcivecpass] = useState(false)
  const cpass =()=>{
    setAtcivecpass(true)
  }
  const changename =()=>{
    
    console.log('change name')
  }
  return (
    <>
        <div className='profile-show'>
            <div className='profile-box'>
                <div className="container-picture-profile">
                    <img src='' className='img-profile'/>
                </div>
                <div className="info-profile">
                    <div className="email-profile">Email : sonesambi@gmail.com</div>
                    <div className="name-profile">Username :&nbsp;
                      <input className="name-info" onClick={changename}/>
                    </div>
                    <div className="change-pass-profile" onClick={cpass}>Change Password</div>
                </div> 
                
                
            </div>
        </div>
        {atcivecpass && <ChangePass setAtcivecpass={setAtcivecpass}/>}
    </>

  )
}

export default Profile;