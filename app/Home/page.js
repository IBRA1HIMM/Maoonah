"use client";
import { useState, useEffect } from "react";
import Events from "../components/Events";
import EventFields from "../components/EventFields";
import NavBar from "../components/NavBar";
import EventForm from "../components/EventForm";
// import useEventValuesStore from "./store/useEventValuesStore";

function Home() {
  // const {storedName,storedDate,storedAvatar}=useEventValuesStore()

  const [showEventFields, setShowEventFields] = useState(false);


  const [eventList, setEventList] = useState([{}]);

  //Backend Code to interact with the database

  //bring events from DB after the component mount
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEventList(prevEventList=>[...prevEventList,...data]);
    }
    fetchEvents();
  }, []);


  async function DeleteEvent(id) {
    // delete Event from DB
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    // delete event from the UI
    setEventList(eventList.filter((event) => event._id !== id));
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
            eventId={event._id}
            Avatar={event.avatar}
            Name={event.name}
            Date={event.date}
            DeleteEvent={() => DeleteEvent(event._id)}
            UpdateEvent={(newName, newDate, newAvatar) =>
              UpdateEvent(event._id, newName, newDate, newAvatar)
            }
          />
        ))}

        
      </div>
      {showEventFields && (
        // <EventFields
        //   showEventFields={showEventFields}
        //   setShowEventFields={setShowEventFields}
        //   eventList={eventList}
        //   setEventList={setEventList}
        //   showImageField={showImageField}
        // />
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

