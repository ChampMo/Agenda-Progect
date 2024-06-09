import React, { useEffect, useRef, useState } from 'react';
import "./Taskshow.css";
import Taskbox from "./Taskbox.jsx";
import Addtask from "./Addtask.jsx";
import axios from "axios";
import { Icon } from '@iconify/react';
import { axiosinstant } from "../lib/axiosinstant";

function Taskshow({ workspace_id }) {
  const [loadInfo, setLoadInfo] = useState(false);
  const [atciveaddtask, setAtciveaddtask] = useState(false);
  const [stateTask, setStateTask] = useState(true);
  const [myTask,setMyTask] = useState();
  const dropdownRef = useRef(null);
  const [classAlltask, setClassAlltask] = useState(
    "all-task  task-title-active"
  );
  const [classMytask, setClassMytask] = useState("my-task");
  const addtask = () => {
    setAtciveaddtask(true);
  };
  const alltask = () => {
    setClassAlltask("all-task task-title-active");
    setClassMytask("my-task");
    setLoadInfo(p => !p);
    setStateTask(true);
  };
  const mytask = () => {
    setClassAlltask("all-task");
    setClassMytask("my-task task-title-active");
    setLoadInfo(p => !p);
    setStateTask(false);
  };

  const [stateFilter, setStateFilter] = useState(false);
  const [selectShow, setSelectShow] = useState(['not-start-status', 'in-progress-status', 'done-status']);
  
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const getMyTask = async () => {
    try{
        await axiosinstant.post("/api/getusertask", {
          workspace_id,
          withCredentials: true 
        })
        .then((response)=>{
            setMyTask(response.data.taskIds);
            console.log(myTask)
        })
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
    }
}






  const handleSelect = (status) => {
    if (!selectShow.includes(status)) {
        setSelectShow([...selectShow, status]);
    } else {
      if(selectShow.length > 1){
        setSelectShow(selectShow.filter((item) => item !== status));
      }
    }
    setLoadInfo(p => !p);
};
const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setStateFilter(false);
  }
};



  console.log('selectShowselectShow',stateFilter)
  return (
    <>
    <style>
            {
            `body {
                overflow: hidden;
            }`
            }
        </style>
      <div className="task-show">
        <div className="task-box">
          <div className="filter-task">
            <div className={classAlltask} onClick={alltask}>
              All Task
            </div>
            <div className={classMytask} onClick={() => {
                mytask();
                getMyTask();
            }}>
              My Task
            </div>
          </div>
          <div className="titleTable">
            <div className="container-item">
              <div className="titleTable-name">Task Name</div> 
              <div className="titleTable-cdate">Task Create Date</div> 
              <div className="titleTable-ddate">Task Due Date</div> 
            </div>
            <div className="container-item2 container-item3">
              <div className="titleTable-role">role</div> 
              <div 
              onClick={()=>setStateFilter(!stateFilter)}
              className="titleTable-status">Status 
                <Icon
                className="icon-titleTable-status" 
                icon={stateFilter?'mingcute:up-fill':"mingcute:down-fill"} 
                width="20" 
                height="20" />
              </div>
            </div>
            <div 
            ref={dropdownRef}
            className={stateFilter?"dropdown open":"dropdown"}>
              <div 
              style={!selectShow.includes('not-start-status')?{backgroundColor:'#adadad'}:null}
              className="dropdown-item1" 
              onClick={()=>handleSelect('not-start-status')}>Not Start</div>
              <div 
              style={!selectShow.includes('in-progress-status')?{backgroundColor:'#adadad'}:null}
              className="dropdown-item2" 
              onClick={()=>handleSelect('in-progress-status')}>In Progress</div>
              <div 
              style={!selectShow.includes('done-status')?{backgroundColor:'#adadad'}:null}
              className="dropdown-item3" 
              onClick={()=>handleSelect('done-status')}>Done</div>
              </div>
          </div>
          <div className="bg-all-taskbox">
            <Taskbox workspace_id={workspace_id} loadInfo={loadInfo} setLoadInfo={setLoadInfo} stateTask={stateTask} myTask={myTask} selectShow={selectShow}/>
          </div>
        </div>
        <div className="add-task-box">
          <div className="add-task" onClick={addtask}>
            Add Task
          </div>
        </div>
      </div>
      {atciveaddtask && <Addtask workspace_id={workspace_id} setAtciveaddtask={setAtciveaddtask} setLoadInfo={setLoadInfo}/>}
    </>
  );
}

export default Taskshow;
