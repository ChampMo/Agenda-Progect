import React from 'react'
import './PeopleRole.css'
import UserInfoBox from '../UserInfoBox.jsx'
import Role from '../Role.jsx';

function PeopleRole() {
  return (
    <>
        <div className='peoplerole-show'>
            <div className="text-share">Share</div>
            <div className="container-shareset">
                <div className="container-search-people">
                    <input className='input-search-people' placeholder='emample@gmail.com'/>
                    <div className="bt-search-people">Search</div>
                </div>

            </div>
            <div className="text-role-set">Role</div>
            <div className="container-roleset">
                <div className='container-role-add'>
                    <div className='bginput-role-add'>
                        <input className='input-role' placeholder='Role Name'/>
                        <input className='input-color' type='color'/>
                    </div>
                    <div className="bt-role-add">Add Role</div>
                </div>
                <div className="container-role-show">
                    <Role/><Role/><Role/><Role/><Role/>
                    <Role/><Role/><Role/><Role/><Role/>
                    <Role/><Role/><Role/><Role/><Role/>
                    <Role/><Role/><Role/><Role/><Role/>
                </div>
            </div>
            <div className="text-people">People</div>
            <div className="container-peopleset">
                <div className="head-peopleset">
                    <div className="head-img"></div>
                    <div className="head-email">Email</div>
                    <div className="head-username">Usermane</div>
                    <div className="head-role">Role</div>
                </div>
                <UserInfoBox/>
                <UserInfoBox/>
                <UserInfoBox/>
            </div>
            <div className="bgexit-workspace">
                <div className="exit-workspace">Exit Workspace</div>
            </div>
            
        </div>
    </>

  )
}

export default PeopleRole;