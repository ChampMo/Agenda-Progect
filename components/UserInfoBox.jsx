import React, { useEffect, useState } from 'react'
import "./UserInfoBox.css";
import Role from "./Role.jsx";
import axios from "axios";
import { Icon } from '@iconify/react';

function UserInfoBox({workspace_id}) {

  const [ userInfos, setUserInfos ] = useState([]);
  useEffect(() => {
    const fetchRole = async () => {
      axios.post("http://localhost:8000/api/workspace/user", {
        workspace_id
      })
        .then((response) => {
          console.log(response.data)
          setUserInfos(response.data.userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchRole();
  }, []);


  return (
    <>
    {userInfos.map((user,item) => (
      <div 
      key={item}
      className="container-box-people">
        <div className='bg-img-user'>
          <img src={user.picture} className="img-box-people" />
          {item === 0 && <Icon className='icon-img-user' icon="streamline:crown-solid" width="25" height="25" />}
        </div>
        <div className="email-box-people">{user.email}</div>
        <div className="username-box-people">{user.username}</div>
        <div className="role-box-people">
          <Role  
            workspace_id = {workspace_id}
            page = 'userinfobox'
            data = {user.user_id}
          />
        </div>
      </div>
    ))}
    </>
  );
}
export default UserInfoBox;
