import React,{useState, useEffect, useRef  } from 'react'
import './Profile.css'
import ChangePass from './ChangePass.jsx'
import axios from "axios";

function Profile({loadInfoname, setLoadInfoname}) {

  const [atcivecpass, setAtcivecpass] = useState(false)
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState('')
  const fileInputRef = useRef(null);

  useEffect(() => {
      const fetchAllWork = async () => {
          axios.get("http://localhost:8000/api/profileInfo",{ withCredentials: true })
              .then((response) => {
              setUserInfo(response.data.userInfo);
              setName(response.data.userInfo.username)
              })
              .catch((error) => {
              console.error(error);
              });
      }
      fetchAllWork();
  }, [loadInfoname]);


  const cpass =()=>{
    setAtcivecpass(true)
  }
  const handleChangeName = async (e) => {
    try {
        const newName = e.target.value;
        const response = await axios.put("http://localhost:8000/api/update/username", {
          withCredentials: true, 
          username: newName
        });

        setLoadInfoname(p=>!p)
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
      const response = await axios.post("http://localhost:8000/api/upload/profile", formData, {
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

  
  return (
    <>
        <div className='profile-show'>
            <div className='profile-box'>
                <div className="container-picture-profile">
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
                <div className="info-profile">
                    <div className="email-profile">Email : {userInfo.email}</div>
                    <div className="name-profile">Username :&nbsp;
                    <input className="name-info" value={name} onChange={(e) => handleChangeName(e)} />
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