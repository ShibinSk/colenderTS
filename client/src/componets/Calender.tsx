import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import EventModel from "./EventModel";
import axios from "axios";
import moment from "moment";
import { el } from "@fullcalendar/core/internal-common";
let data: any[] = [];
let globalData: String[] = [];
let datatitle: String[] = [];

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

  async function handleClick(info: any) {
    return events.map(async (data: any) => {
      let date: Number = data.start.slice(0, 10);
      console.log(date, "Is this Data");
      let secondDate: Number = info.dateStr;

      console.log(data);

      if (date === secondDate) {
        alert(data.title);
      }
    });

    // if (Array.isArray(events)) {
    //   data = events.map((e: any) => {
    //     return e;
    //   });
    //   data.map((e: any, index: number) => globalData.push(e.start));
    //   data.map((e: any, index: number) => datatitle.push(e.title));

    //   console.log(datatitle, "heheeehh");
    //   const dateOnly = globalData[0].slice(0, 10);
    //   console.log(dateOnly, "dateOnly");

    //   if (dateOnly === info.dateStr) {
    //     alert(datatitle);
    //   } else {
    //     alert("Not Matching ")
    //   }
    // }
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
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          initialView="dayGridMonth"
          ref={calendarRef}
          eventAdd={(event) => handleEvent(event)}
          datesSet={(date) => handleDates(date)}
          dateClick={(info) => handleClick(info)}
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
