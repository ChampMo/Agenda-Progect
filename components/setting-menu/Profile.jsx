import React,{useState, useEffect, useRef  } from 'react'
import './Profile.css'
import ChangePass from './ChangePass.jsx'
import axios from "axios";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { axiosinstant } from "../../lib/axiosinstant";


function Profile({loadInfoname, setLoadInfoname, type}) {

  const [atcivecpass, setAtcivecpass] = useState(false)
  const [loadInfo, setLoadInfo] = useState(false)
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState('')
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    
      const fetchAllWork = async () => {
        axiosinstant.get("/api/profileInfo",{ withCredentials: true })
              .then((response) => {
              setUserInfo(response.data.userInfo);
              setName(response.data.userInfo.username)
              })
              .catch((error) => {
              console.error(error);
              });
      }
      fetchAllWork();
  }, [loadInfoname, loadInfo]);


  const cpass =()=>{
    setAtcivecpass(true)
  }
  const handleChangeName = async (e) => {
    try {
        const newName = e.target.value;
        const response = await axiosinstant.put("/api/update/username", {
          withCredentials: true, 
          username: newName
        });
        if(type==="setting"){
          setLoadInfo(p=>!p)
        }else{
          setLoadInfoname(p=>!p)
        }
        
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}



const handleImageClick = () => {
  fileInputRef.current.click();
};
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('profile', file);

    try {
      const response = await axiosinstant.post("/api/upload/profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      setLoadInfoname(p=>!p)
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        picture: response.data.userInfo.picture
      }));
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};
const handleGoBack = () => {
  navigate(-1);
};
  
  return (
    <>
        <div className={type==="setting"?'profile-showset':'profile-show'}>
            {type==="setting"&& 
            <div className="bg-title-profile">
              <Icon onClick={handleGoBack} className="icon-title-profile" icon="ion:caret-back" width="40" height="40" />
              <div className="title-profile">Profile</div>
            </div>
            }
            <div className={type==="setting"?'profile-boxset':'profile-box'}>
                <div className={type==="setting"?'container-picture-profileset':"container-picture-profile"}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} 
                />
                <img 
                  src={userInfo.picture} 
                  className='img-profile' 
                  onClick={handleImageClick} 
                  alt="Profile" 
                />
                </div>
                <div className={type==="setting"?'info-profileset':"info-profile"}>
                    <div className="email-profile">Email : {userInfo.email}</div>
                    <div className="name-profile">Username :&nbsp;
                    <input className={type==="setting"?'name-infoset':"name-info"} value={name} onChange={(e) => handleChangeName(e)} />
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