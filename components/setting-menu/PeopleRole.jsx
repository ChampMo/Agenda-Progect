import React, { useEffect, useState } from 'react'
import './PeopleRole.css'
import UserInfoBox from '../UserInfoBox.jsx'
import Role from '../Role.jsx';
import axios from "axios";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';


function PeopleRole({workspace_id}) {
    
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [inputColor, setInputColor] = useState('#000')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailData, setEmailData] = useState([])
    const [styleBt, setStyleBt] = useState(false)
    const [emailUser, setEmailUser] = useState()
    const [noUser, setNoUser] = useState(false)
    const handleAddrole = async () => {
        try{
            await axios.post("http://localhost:8000/api/addrole", {
                workspace_id,
                role_name:name,
                color:inputColor
            })
            .then((response)=>{
                setName('')
                setInputColor('#000')
                setLoadingInfo(p=>!p)
            })
        }
        catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    const sendEmail = async () => {
        if(!styleBt){
            try{
                console.log(emailUser,workspace_id)
                await axios.post("http://localhost:8000/api/sendemail", {
                    emailUser,
                    workspace_id,
                    withCredentials: true
                })
                .then((response)=>{
                    setStyleBt(true)
                    
                })
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    }

    const searchEmail = async () => {
        try{
            await axios.post("http://localhost:8000/api/searchemail", {
                email,
                workspace_id
            })
            .then((response)=>{
                if(response.data.message === 'User already send request' ){
                    setStyleBt(true)
                }else{
                    setStyleBt(false)
                }
                if(response.data.message === 'User not found'){
                    setEmailUser()
                    setEmailData([])
                    setNoUser(true)
                }else{
                    setNoUser(false)
                    setEmailData(response.data.user);
                    setEmailUser(response.data.user.user_id)
                }
            }) 
        }
        catch (error) {
        }
    }
    console.log('emailData',emailData)
    
    const exitWorkspace = async () =>{
        try{
            await axios.post("http://localhost:8000/api/workspace/exit", {
                withCredentials: true,
                workspace_id
            })
            navigate("/allwork")
        }
        catch (error) {
        }
    }
    const navigate = useNavigate()
return (
    <>
        <div className='peoplerole-show'>
            <div className="text-share">Share</div>
            <div className="container-shareset">
                <div className="container-search-people">
                    <div className='row1'>
                        <input className='input-search-people' onChange={(e)=>setEmail(e.target.value)} placeholder='example@gmail.com' value={email}/>
                        <div className = "bt-search-people" onClick={searchEmail}>Search</div>
                    </div>
                    {emailData.length !== 0 &&
                    <div className = "card-user">
                        <div className='bg-info-card'>
                            <img className='card-picture' src={emailData.picture} alt="profile" />
                            <div className='card-username'>{emailData.username}</div>
                            <div className='card-email' >{emailData.email}</div>
                        </div>
                        <div className = "bt-share-people" onClick={sendEmail}>
                            <Icon className='icon-cha' icon={styleBt?"fluent:checkmark-12-filled":"ph:plus-bold"} width="30" height="30" />
                        </div>
                    </div>
                    }
                    {noUser && <div className='no-user'>User not found!</div>}
                </div>
            </div>
            <div className="text-role-set">Role</div>
            <div className="container-roleset">
                <div className='container-role-add'>
                    <div className='bginput-role-add'>
                        <input className='input-role' placeholder='Role Name' onChange={(e)=>setName(e.target.value)} value={name}/>
                        <input className='input-color' type='color' onChange={(e)=>setInputColor(e.target.value)} value={inputColor}/>
                    </div>
                    <div className="bt-role-add" onClick={name.replace(/\s+/g, '') === '' ?() => setName(''): handleAddrole}>Add Role</div>
                </div>
                <div className="container-role-show">
                    <Role workspace_id={workspace_id} loadingInfo={loadingInfo} setLoadingInfo={setLoadingInfo} page='roleEdit'/>
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
                <UserInfoBox workspace_id={workspace_id} loadingInfo={loadingInfo}/>
            </div>
            <div className="bgexit-workspace">
                <div className="exit-workspace" onClick={exitWorkspace}>Exit Workspace</div>
            </div>
            
        </div>
    </>

  )
}

export default PeopleRole;