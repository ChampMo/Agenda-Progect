import React, { useEffect, useRef, useState } from 'react';
import "./Role.css";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { Icon } from '@iconify/react';


function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return 'rgb(' + [r, g, b].join(', ') + ')';
}

function getContrastColor(color) {
  color = hexToRgb(color);

  if (!color || !/^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(color)) {
    return "black";
  }

  const rgb = color.match(/\d+/g).map(Number);

  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;

  const contrastColor = luminance < 0.5 ? "white" : "black";
  return contrastColor;
}








function Role({ workspace_id, loadingInfo, setLoadingInfo, loadInfoRole, page, setData, data, data2, task }) {
  const [loading, setLoading] = useState(true);
  const [loadInfo2, setLoadingInfo2] = useState(false);
  const [roleInfo, setRoleInfo] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [roletoselect, setRoleToSelect] = useState([]);
  const [roleSelectToChange, setRoleSelectToChange] = useState([]);
  const [statePopup, setStatePopup] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log('+---------------------',data)
  useEffect(() => {
    const getRole = async () => {
      if(page === 'alltask'){
        try {
          const response = await axios.post("http://localhost:8000/api/getrole/task", {
            workspace_id,
            task_id:data,
            withCredentials: true
          });
          setRoleInfo(response.data.role);

        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      }else if(page === 'userinfobox'){
        try {
          const response = await axios.post("http://localhost:8000/api/workspace/user/role", {
            workspace_id,
            user_id:data,
            withCredentials: true
          });
          setRoleInfo(response.data.userInfo.role_id);
          setRoleSelectToChange([])
          for(let i=0;i<response.data.userInfo.role_id.length;i++){
            setRoleSelectToChange(p=>[...p,response.data.userInfo.role_id[i].role_id])
          }

          const response2 = await axios.post("http://localhost:8000/api/getrole", {
            workspace_id,
            withCredentials: true
          });
          setRoleToSelect(response2.data.role);

          
        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      }else if(page === 'EditTask'){
        try {
          const response = await axios.post("http://localhost:8000/api/getrole/task", {
            workspace_id,
            task_id:data2,
            withCredentials: true
          });
          setData({
            taskname: task.task_name,
            note: task.note,
            duedate: task.task_due_date,
            status: task.status_task,
            role: []
          })
          for(let i=0;i<response.data.role.length;i++){
            setData(p=>({...p, role:[...p.role,response.data.role[i].role_id]}))
          }
          console.log('response.data.role',response.data.role)
          const response2 = await axios.post("http://localhost:8000/api/getrole", {
            workspace_id,
            withCredentials: true
          });
          setRoleInfo(response2.data.role);
        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      }else{
        try {
          const response = await axios.post("http://localhost:8000/api/getrole", {
            workspace_id,
            withCredentials: true
          });
          setRoleInfo(response.data.role);
        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      };
    }

    if (workspace_id !== undefined) {
      getRole();
    }
  }, [workspace_id, loadingInfo, loadInfo2, loadInfoRole]);
  
  // useEffect(() => {
  //   console.log('----datadatadata',data,roleSelectToChange)
  //   const fetchRole = async () => {
  //   if(page === 'userinfobox'){
  //     try {
  //       const response = await axios.post("http://localhost:8000/api/workspace/user/roleadd", {
  //         user_id: data,
  //         role_id: roleSelectToChange,
  //         withCredentials: true
  //       });
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }};
  //   fetchRole();
      
  // }, [roleSelectToChange]);


  const handleDelete = async (items, index) => {
    try {
      await axios.delete("http://localhost:8000/api/deleterole", {
        data: { role_id: items.role_id }
      });
      setDeletingIndex(index);
      setTimeout(() => {
        setDeletingIndex(null);
        setLoadingInfo(p=>!p)
      }, 200);
      
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  }


  const handleSelect = (items, index) => {
    if(page==='userinfobox'){
      let updatedRoles = [...roleSelectToChange];
      const roleIndex = updatedRoles.findIndex((roleId) => roleId === items.role_id);
      if (roleIndex === -1) {
        updatedRoles.push(items.role_id);
      } else {
        updatedRoles.splice(roleIndex, 1);
      }
      setRoleSelectToChange(updatedRoles);
    }else{
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex === -1) {
        role.push(items.role_id);
      } else {
        role.splice(roleIndex, 1);
      }
      setData({ ...data, role });
    }
  }

  const handleSytle = (items, index) => {
    if(page.page==='addtask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { backgroundColor: items.color };
      }else{
        return { backgroundColor: '#e7e7e7' };
      }
    }else if(page === 'userinfobox'){
      const role = roleSelectToChange;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { backgroundColor: items.color };
      }else{
        return { backgroundColor: '#e7e7e7' };
      }
    }else if( page === 'EditTask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { backgroundColor: items.color };
      }else{
        return { backgroundColor: '#e7e7e7' };
      }
    }else{
      return { backgroundColor: items.color };
    }
  }

  const handleStyleText = (items, index)=>{
    if(page.page==='addtask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { color: getContrastColor(items.color) };
      }else{
        return { color: '#686868' };
      }
    }else if(page==='userinfobox'){
      const role = roleSelectToChange;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { color: getContrastColor(items.color) };
      }else{
        return { color: '#686868' };
      }
    }else if( page === 'EditTask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { color: getContrastColor(items.color) };
      }else{
        return { color: '#686868' };
      }
    }else{
      return { color: getContrastColor(items.color) };
    }
  }

  const handleClickOutside = async(event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {

      setStatePopup(false); // Close popup 
      setLoadingInfo2(p=>!p)
      console.log('close')

     
    };
  }

  const handlesaveRole = async () => {
  if(page === 'userinfobox'){
    try {
      
      const response = await axios.post("http://localhost:8000/api/workspace/user/roleadd", {
        user_id: data,
        workspace_id,
        role_id: roleSelectToChange,
        withCredentials: true
      });
      console.log(response.data);
      setStatePopup(false);
      setLoadingInfo2(p=>!p)
    } catch (error) {
      console.error(error);
    }
  }};

  return (
    <>
      {loading ? (
        <div 
          style={{height: page === 'alltask' ? 20 : 50}}
          className="bg-loading"
        >
          <DotLoader
            color="#2960cd"
            loading={loading}
            size={page === 'alltask' ? 20 : 50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {roleInfo.length > 0 ? (
            <>
              {roleInfo.map((items, index) => (
                <div
                  onClick={() => page === 'userinfobox'?null:handleSelect(items, index)}
                  className={page === 'alltask' || page === 'userinfobox' ? 'rolemini' : `role ${deletingIndex === index ? 'scale-down' : ''}`}
                  key={index}
                  style={page === 'userinfobox'?{backgroundColor: items.color}:handleSytle(items, index)}>
                  <span style={page === 'userinfobox'?{color: getContrastColor(items.color)}:handleStyleText(items, index)}>
                    {items.role_name}
                  </span>
                  {page === 'roleEdit' && (
                    <div onClick={() => handleDelete(items, index)} className="del-role">
                      <Icon icon="zondicons:close-solid" />
                    </div>
                  )}
                </div>
              ))}
              {page === 'userinfobox' &&(
                  <>
                    <div
                      ref={containerRef}
                      onClick={() => setStatePopup(true)}
                      className='roleminiadd'>
                      <span>
                        <Icon icon="fa-solid:plus" width="15" height="15" />
                      </span>
                    </div>

                    <div 
                    ref={containerRef}
                    className={ statePopup ? "containerRoletoSelect":'containerRoletoSelect close_role'}>
                      {roletoselect.map((items, index) => (
                        <div
                          onClick={() => handleSelect(items, index)}
                          className='rolemini'
                          key={index}
                          style={handleSytle(items, index)}
                        >
                          <span style={handleStyleText(items, index)}>
                            {items.role_name}
                          </span>
                        </div>
                      ))}
                      <div className='bg-checkMark'>
                        <Icon className='checkMark' onClick={handlesaveRole} icon="mingcute:check-fill" width="20" height="20" />
                      </div>
                    </div>

                  </>
                )}
              
            </>
            ) : (
              <>
                {page === 'userinfobox' &&(
                  <>
                    <div
                      ref={containerRef}
                      onClick={() => setStatePopup(true)}
                      className='roleminiadd'>
                      <span>
                        <Icon icon="fa-solid:plus" width="15" height="15" />
                      </span>
                    </div>

                    <div
                    ref={containerRef}
                    className={ statePopup ? "containerRoletoSelect":'containerRoletoSelect close_role'}>
                      {roletoselect.map((items, index) => (
                        <div
                          onClick={() => handleSelect(items, index)}
                          className='rolemini'
                          key={index}
                          style={handleSytle(items, index)}
                        >
                          <span style={handleStyleText(items, index)}>
                            {items.role_name}
                          </span>
                        </div>
                      ))}
                      <div className='bg-checkMark'>
                        <Icon onClick={handlesaveRole} icon="mingcute:check-fill" width="20" height="20" />
                      </div>
                    </div>

                  </>
                )}
              {page !== 'userinfobox' && 
              <div className="no-roles">
                {page === 'alltask' ? "No Role" : page === 'userinfobox' ? '' : "Your workspace has no role."}
              </div>}
            </>

          )}
          
        </>
      )}
    </>
  );
  
}

export default Role;
