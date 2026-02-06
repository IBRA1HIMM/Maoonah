"use client";
import { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import Events from "../components/Events";
import NavBar from "../components/NavBar";
import EventForm from "../components/EventForm";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";
// import useEventValuesStore from "./store/useEventValuesStore";

function Home() {
 
  // const {storedName,storedDate,storedAvatar}=useEventValuesStore()
  const [showEventFields, setShowEventFields] = useState(false);
  const [eventList, setEventList] = useState([]);
  //Backend Code to interact with the database

  //bring events from DB after the component mount
  useEffect(() => {
    async function fetchEvents() {
    const sesstion = await getSession();
    if(sesstion){
      const res = await fetch("/api/events");
      const data = await res.json();
      setEventList(data);
    }
    
    else{
   const data= loadFromLocal("guest_events");
   setEventList(data)
      alert("you are in guest mode")

    }
  }
    fetchEvents();

  }, []);


  async function DeleteEvent(id,name) {
const session = await getSession();

    // delete Event from DB if user singed In
    if (session){
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    // delete event from the UI
    setEventList(eventList.filter((event) => event._id !== id));
  }
  else{

    //deleting for guest mode
    const events=loadFromLocal("guest_events");
    const EventsFiltered=events.filter((event)=>event.name !==name);
    saveToLocal("guest_events",EventsFiltered);
    setEventList(EventsFiltered);
  }
  }
  
//  Update the Event in the DB and th UI
  async function UpdateEvent(id, newName, newDate, newAvatar) {


    const formData= new FormData();
formData.append("id",id)
formData.append("name",newName)
formData.append("date",newDate)
formData.append("avatar",newAvatar)
   const req= await fetch("/api/events", {
      method: "PUT",
      body:formData,
    });

   const {newAvatarUrl}= await req.json();

    setEventList(
      eventList.map((event) =>
        event._id === id
          ? { ...event, name: newName, date: newDate, avatar: newAvatarUrl }
          : event
      )
    );
  }

  return (
    <div className="flex">
      {/* NavBar */}
      <NavBar setShowEventFields={setShowEventFields}/>

      <div className=" h-fit  w-full flex flex-wrap justify-center items-center">
        {eventList.map((event, index) => (
          <Events
            key={index}
            eventId={event._id || event.guest_id}
            Avatar={event.avatar}
            Name={event.name}
            Date={event.date}
            DeleteEvent={() => DeleteEvent(event._id,event.name)}
            UpdateEvent={(newName, newDate, newAvatar) =>
              UpdateEvent(event._id, newName, newDate, newAvatar)
            }
          />
        ))}

        
      </div>
      {showEventFields && (
        <EventForm
        showEventFields={showEventFields}
          setShowEventFields={setShowEventFields}
          eventList={eventList}
          setEventList={setEventList}
        />
      )}
    
    </div>
  );
}

export default Home;

