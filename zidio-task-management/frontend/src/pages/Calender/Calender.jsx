import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from "react-icons/fa";
import AddEvent from "./AddEvent";
import { addEvent, updateEvent, deleteEvent } from "../../utils/api";
import { useAuth } from "../../Context/AuthContext";



const Calendar = ({events, setEvents}) => {

  const {user} = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [ismodelopen, setModelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleEventClick = (event, eventPosition) => {
    setSelectedEvent({ ...event, postion: eventPosition });
    setIsEditing(false);
  };

  const closeEventPopup = () => {
    setSelectedEvent(null);
  };

  const togglemodel = () => {
    setModelOpen(!ismodelopen)
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const addNewEvent = async (newEvent) => {
    try{
      const savedEvent = await addEvent(newEvent);
      setEvents([...events, savedEvent]);
      setModelOpen(false);
      alert("Event added successfully");
    } catch (error){
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.")

    }
  };

  const handleEditEvent = () => {
    setIsEditing(true);
    setModelOpen(true);
  };

  const updateExistingEvent = async (updatedEvent) => {
    try {
      const newEvent = await updateEvent(updatedEvent._id, updatedEvent);
      setEvents(events.map(event => (event._id === newEvent._id ? newEvent : event)));
      setModelOpen(false);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
      setSelectedEvent(null);
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };


  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day, index) => (
      <div key={index} className="text-center border font-bold p-2 bg-orange text-black">{day}</div>
    ));
  };

  const renderCells = () => {
    let days = [];
    let day = startDate;
    while (day <= endDate) {
      const formattedDate = format(day, "yyyy-MM-dd");
      const event = events.find(e => e.date === formattedDate);
      days.push(
        <div key={formattedDate} className="border h-18 p-4 relative text-center flex flex-col justify-center items-center">
          <span className={`absolute top-2 left-2 text-lg ${day.getMonth() === monthStart.getMonth() ? "text-black" : "text-gray-400"}`}>
            {format(day, "d")}
          </span>
          {event && (
            <div className={`event-showcase text-xs md:text-sm text-white p-1 rounded mt-2 md:mt-0 ${event.color} cursor-pointer`} onClick={(e) => handleEventClick(event, { x: e.clientX, y: e.clientY })} >{event.title}</div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    return days;
  };


  return (
    <div className="calender w-full h-full flex flex-col  gap-5">
      <div className="title mb-1 m-5 ml-8"  data-aos="fade-right" data-aos-duration="1800">
        <h1 className='text-2xl font-semibold'>Calender</h1>
      </div>
      <div className="w-full rounded-lg  relative"  data-aos="fade-down" data-aos-duration="2000">
        <div className="flex justify-center items-center mb-5 gap-5">
          <div className="flex gap-5">
            <button onClick={handlePrevMonth} className="p-2 bg-orange ease-linear hover:scale-95 rounded-full"><FaChevronLeft /></button>
            <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={handleNextMonth} className="p-2 bg-orange ease-linear hover:scale-95  rounded-full"><FaChevronRight /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 h-12 border-t border-l">{renderDays()}</div>
        <div className="grid grid-cols-7 h-[445px]  border-l border-b relative">{renderCells()}</div>
        {user?.role === "manager" && 
        <button className="mt-4 flex items-center justify-center w-10 h-10 bg-orange text-white rounded-full shadow-lg absolute bottom-5 right-5" onClick={togglemodel}>
          <FaPlus />
        </button> }
      </div>

      {ismodelopen && (
        <div className="model-overlay inset-0 fixed bg-gray-300 bg-opacity-50 flex justify-center items-center z-50" >
          <div className="model bg-white w-[370px] md:w-[550px] py-4 px-2 md:px-5 rounded-lg shadow-lg">
            <AddEvent addnewevent={isEditing ? updateExistingEvent : addNewEvent} existingEvent={isEditing ? selectedEvent : null} />
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="absolute bg-white shadow-lg p-4 rounded-lg border z-50 w-64 flex flex-col gap-1"
          style={{
            top: selectedEvent.postion.y + 10 + "px",
            left: selectedEvent.postion.x + "px",
          }}>
          <div className="flex justify-between items-center">
            <h3 className="font-base font-blod text-lg">{selectedEvent.title}</h3>
            <button onClick={closeEventPopup} className="text-red-500"><FaTimes /></button>
          </div>
          <p className="text-sm text-gray-600">{selectedEvent.description}</p>
          <p className="text-sm font-light mt-1">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
          <hr className="bg-gray-300" />
          {user?.role === "admin" && 
          <div className="edit-delete-buttons flex gap-3 mt-1">
            <button className="w-10 h-6 bg-lightgreen text-green-700 text-xs p-1" onClick={handleEditEvent} >Edit</button>
            <button className="w-12 h-6 bg-lightred text-red-700 text-xs p-1" onClick={()=> handleDeleteEvent(selectedEvent._id)} >Delete</button>
          </div>}
        </div>
      )}

    </div>
  );
};

export default Calendar;
