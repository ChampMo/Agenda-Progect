import React from 'react'
import './Profile.css'
import ChangePass from './ChangePass.jsx'

function Profile() {
  return (
    <>
        <div className='profile-show'>
            <div className='profile-box'>
                <div className="container-picture-profile">
                    <img src='' className='img-profile'/>
                </div>
                <div className="info-profile">
                    <div className="email-profile">Email : sonesambi@gmail.com</div>
                    <div className="name-profile">Champ</div>
                    <div className="change-pass-profile">Change Password</div>
                </div> 
                
                
            </div>
            <div className="delete-acc-profile">Delete Account</div>
        </div>
        <ChangePass/>
    </>

  )
}

export default Profile;