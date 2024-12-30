import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./UpcomingEventsCard.css";
const localizer = momentLocalizer(moment);

const UpcomingEventsCard = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Initial Event",
      start: new Date(2024, 11, 25, 10, 0),
      end: new Date(2024, 11, 25, 12, 0),
    },
  ]);

  const [editingEvent, setEditingEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setEditingEvent(event);
  };

  const saveEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev))
    );
    setEditingEvent(null);
  };

  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      start: new Date(2024, 11, 26, 14, 0),
      end: new Date(2024, 11, 26, 16, 0),
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="calendar-container">
      <button className="add-event-button" onClick={addEvent}>
        Add Event
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
      {editingEvent && (
        <div className="edit-event-form">
          <h3>Edit Event</h3>
          <label>
            Title:
            <input
              type="text"
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
            />
          </label>
          <label>
            Start:
            <input
              type="datetime-local"
              value={moment(editingEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  start: new Date(e.target.value),
                })
              }
            />
          </label>
          <label>
            End:
            <input
              type="datetime-local"
              value={moment(editingEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  end: new Date(e.target.value),
                })
              }
            />
          </label>
          <button className="save-event-button" onClick={saveEvent}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsCard;
