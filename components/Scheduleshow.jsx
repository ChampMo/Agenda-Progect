import React from "react";
import "./Scheduleshow.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Addtask from './Addtask.jsx';


function Scheduleshow({workspace_id}) {

  const handleEventClick = (clickInfo) => {
    console.log('numTask',numTask)
    console.log('clickInfo',clickInfo.event.id)
    for (let i = 0; i < numTask.length; i++) {
      if (numTask[i].task_id == clickInfo.event.id) {
        console.log('numTask[i]',numTask[i])
        setTask(numTask[i]);
        setAtciveaddtask(true);
      }
    }
  };

  const [eventTask, setEventTask] = useState([]);
  const [numTask, setNumTask] = useState([]);

  const colorTask = (due_date) => {
    const today = new Date();
    const dueDate = new Date(due_date);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 2) {
      return "#EE4E4E";
    } else if (diffDays <=5 ) {
      return "#EF9C66";
    } else {
      return "#9DDE8B";
    }
  }
    const [atciveaddtask, setAtciveaddtask] = useState(false);
    const [loadInfo, setLoadInfo] = useState(false);
    const [task, setTask] = useState([]);



  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/gettask", {
          workspace_id
        });
        console.log('response.data.task',response.data.task)
        const now = new Date();
          setNumTask(response.data.task);
          setEventTask([]);
          for (let i = 0; i < response.data.task.length; i++) {
            setEventTask((prev) => [
              ...prev,
              {
                id: response.data.task[i].task_id,
                title: response.data.task[i].task_name,
                start: response.data.task[i].task_due_date < response.data.task[i].task_create_date ? response.data.task[i].task_due_date : response.data.task[i].task_create_date,
                end: response.data.task[i].task_due_date,
                status: response.data.task[i].status_task,
                color: colorTask(response.data.task[i].task_due_date),
                // color: response.data.task[i].status_task === 'not-start-status' ? "#333" : response.data.task[i].status_task === "done-status" ? "#00FF00" : "#0000FF",
                description: response.data.task[i].note,
              },
            ]);
          }

        
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (workspace_id !== undefined) {
      getTask();
    }
  }, [workspace_id, loadInfo]);

console.log('eventTask',eventTask)

  return (
    <>
      <div className="bg-calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventTask}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
        <Tooltip id="event-tooltip" place="top" effect="solid" />
      </div>
      {atciveaddtask && <Addtask workspace_id={workspace_id} setAtciveaddtask={setAtciveaddtask} setLoadInfo={setLoadInfo} task={task} page2='EditTask'/>}

    </>
  );

  function renderEventContent(eventInfo) {
    return (
      <div data-tip={eventInfo.event.extendedProps.description} data-for="event-tooltip">
        <span>{eventInfo.event.title}</span>
      </div>
    );
  }
}

export default Scheduleshow;

