import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: (eventData: EventData) => void;
};
const customStyles: any = {
  content: {
    top: "5%",
    left: "5%",
    right: "auto",
    bottom: "10%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
type EventData = {
  title: string;
  start: Date;
  end: Date;
};

function EventModel({ isOpen, onClose, onEventAdded }: Props) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [evnet, setEvents] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const eventData: EventData = {
      title,
      start,
      end,
    };

    onEventAdded(eventData);
    onClose();
  };

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onStartChange = (date: Moment | string) => {
    if (moment.isMoment(date)) {
      setStart(date.toDate());
    } else {
      setStart(new Date(date));
    }
  };

  const onEndChange = (date: Moment | string) => {
    if (moment.isMoment(date)) {
      setEnd(date.toDate());
    } else {
      setEnd(new Date(date));
    }
  };

  async function events() {
    const response = await axios.get("http://localhost:5000/get-event");
    setEvents(response.data);
    console.log(response.data, "rrrr");
  }
  useEffect(() => {
    events();
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={onTitleChange}
          style={customStyles}
        />
        {/* Other form fields for start and end dates */}
        <div>
          <label htmlFor="">End Date</label>
          <Datetime value={start} onChange={onStartChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
      
   
      </div>
    </Modal>
  );
}

export default EventModel;
