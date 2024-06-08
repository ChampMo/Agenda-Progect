import React from "react";
import "./Scheduleshow.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Scheduleshow({workspace_id}) {

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.id)
  };

  const [eventTask, setEventTask] = useState([]);
  const [numTask, setNumTask] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/gettask", {
          workspace_id
        });
        console.log('response.data.task',response.data.task)
          setNumTask(response.data.task);
          setEventTask([]);
          for (let i = 0; i < response.data.task.length; i++) {
            setEventTask((prev) => [
              ...prev,
              {
                id: response.data.task[i].task_id,
                title: response.data.task[i].task_name,
                start: response.data.task[i].task_create_date,
                end: response.data.task[i].task_due_date,
                status: response.data.task[i].status_task,
                color: response.data.task[i].status_task === 'not-start-status' ? "#333" : response.data.task[i].status_task === "done-status" ? "#00FF00" : "#0000FF",
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
  }, [workspace_id]);

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

