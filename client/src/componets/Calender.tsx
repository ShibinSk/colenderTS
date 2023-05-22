import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import EventModel from "./EventModel";
import axios from "axios";
import moment from "moment";

function Calendar(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef<FullCalendar>(null);

  const onEventAdded = (event: any) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        title: event.title,
      });
    }
  };

  async function handleEvent(data: any) {
    await axios.post("http://localhost:5000/create-event", data.event);
  }

  async function handleDates(data: any) {
    const response = await axios.get("http://localhost:5000/get-event");

    console.log(response, "fśffffffffffffffffff");

    setEvents(response.data);
  }

  return (
    <div>
      <button
        className="btn btn-primary "
        style={{ marginLeft: "50%" }}
        onClick={() => setModalOpen(true)}
      >
        Add Event{" "}
      </button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={events}
          initialView="dayGridMonth"
          ref={calendarRef}
          eventAdd={(event) => handleEvent(event)}
          datesSet={(date) => handleDates(date)}
        />
        <EventModel
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={onEventAdded}
        />
      </div>
    </div>
  );
}

export default Calendar;
