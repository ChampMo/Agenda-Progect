import React from "react";
import "./Scheduleshow.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Tooltip } from 'react-tooltip';

function Scheduleshow() {
  const events = [
    {
      title: "front",
      start: "2024-04-18",
      end: "2024-04-20",
      color: "#FF0000",
      description: "Frontend Development",
    },
    { title: "Back", start: "2024-04-20", end: "2024-04-20", color: "#00FF00", description: "Backend Development" },
    { title: "UI", start: "2024-04-19", end: "2024-04-18", color: "#fff", description: "UI Design" },
    { title: "UX", start: "2024-04-28", end: "2024-04-29", color: "#888", description: "UX Research" },
    { title: "UI", start: "2024-04-29", end: "2024-04-18", color: "#fff", description: "UI Review" },
  ];
  const handleEventClick = (clickInfo) => {
    alert(`Event: ${clickInfo.event.title}`);
  };
  return (
    <>
      <div className="bg-calendar">
        <FullCalendar
          className="calendar"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
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

