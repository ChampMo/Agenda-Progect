import React from 'react'
import './UserInfoBox.css'
import Role from './Role.jsx'

function UserInfoBox() {
  return (
    <>
        <div className="container-box-people">
            <img className='img-box-people'/>
            <div className="email-box-people">Email</div>
            <div className="username-box-people">Username</div>
            <div className="role-box-people">
                <Role/><Role/><Role/><Role/>
                <Role/><Role/><Role/><Role/>
                <Role/><Role/><Role/><Role/>
            </div>

        </div>
    </>
  )
}
export default UserInfoBox;