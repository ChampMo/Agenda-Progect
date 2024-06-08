import React,{useState, useEffect, useRef  } from 'react'
import './Project.css'
import axios from "axios";

function Project({ workspace_id }) {

  const [loadInfoname, setLoadInfoname] = useState(false)
  const [atcivecpass, setAtcivecpass] = useState(false)
  const [workspaceInfo, setWorkspaceInfo] = useState({});
  const [roleInfo, setRoleInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([])
  const [name, setName] = useState('')
  const [formattedDates, setFormattedDates] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
      const fetchAllWork = async () => {
          axios.post("http://localhost:8000/api/workspaceinfo",{ 
            withCredentials: true,
            workspace_id
          })
              .then((response) => {
              setWorkspaceInfo(response.data.workspaceInfo);
              setName(response.data.workspaceInfo.workspace_name)
              setRoleInfo(response.data.roleInfo)
              setTaskInfo(response.data.taskInfo)

              const monthsAbbreviated = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ];
            
              const dates = () => {
                  const isoDate = response.data.workspaceInfo.workspace_create_date;
                  const date = new Date(isoDate);
                  const day = date.getDate();
                  const month = monthsAbbreviated[date.getMonth()]; // ใช้เดือนอังกฤษแบบย่อ
                  const year = date.getFullYear();
                  return `${day} ${month} ${year}`;
              };
            
              setFormattedDates(dates);

              })
              .catch((error) => {
              console.error(error);
              });
      }
      fetchAllWork();
  }, [loadInfoname]);

const handleImageClick = () => {
  fileInputRef.current.click();
};
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('workspace_icon', file);
    formData.append('workspace_id', workspace_id);

    try {
      const response = await axios.post("http://localhost:8000/api/upload/workspace", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setWorkspaceInfo((prevInfo) => ({
        ...prevInfo,
        workspace_icon: response.data.userInfo.workspace_icon
      }));
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}

const handleNameChange = async(e) => {
  const name = e.target.value;
  try{
      await axios.put("http://localhost:8000/api/update/workspace_name", {
          withCredentials: true,
          workspace_id: workspace_id,
          workspace_name: name,
      })
      .then((response) => {
        setName(response.data.workspace_name);
      })
  } catch (error) {
      console.error(error);
  }
};

  return (
    <>
        <div className='project-show'>
                <div className="container-picture-project">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                  />
                  <img 
                    src={workspaceInfo.workspace_icon} 
                    className='img-profile' 
                    onClick={handleImageClick} 
                    alt="Profile" 
                  />
                </div>
                <div className="info-project">
                    <div className="nameset-project">Project Name :&nbsp;
                      <input value={name} className="nameset-info" onChange={(e) => handleNameChange(e)}/>
                    </div>
                    <div className="create-date-project">Create Date : {formattedDates}</div>
                    <div className="amount-task-project">Amount of Task : {taskInfo.length}</div>
                    <div className="amount-role-project">Amount of Role : {roleInfo.length}</div>
                </div>
        </div>
        
    </>

  )
}

export default Project;