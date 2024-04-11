import React from "react";
import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
// import { Calendar as FullCalendar } from "@fullcalendar/core/index.js";

// let calendar = new FullCalendar("", {
//   plugins: [googleCalendarPlugin],
//   googleCalendarApiKey: import.meta.env.VITE_CALENDAR_KEY,
//   events: {
//     googleCalendarId: "94mir.ms@gmail.lcom",
//   },
// });

export const Calendar = () => {
  const events = [
    { title: "event 1", date: "2024-04-06" },
    { title: "event 2", date: "2024-04-08" },
  ];

  // const handleDateClick = (arg) => {
  //   console.log(arg.dateStr);
  // };

  return (
    <>
      <Typography variant="h3">Мій Календар</Typography>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={import.meta.env.VITE_CALENDAR_KEY}
        // dateClick={handleDateClick}
        events={events}
      />

      {/* {calendar.render()} */}
    </>
  );
};
