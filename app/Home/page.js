"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import Events from "../components/Events";
import EventFields from "../components/EventFields";
// import useEventValuesStore from "./store/useEventValuesStore";
import { useSession } from "next-auth/react";

function Home() {
  // const {storedName,storedDate,storedAvatar}=useEventValuesStore()

  const [showEventFields, setShowEventFields] = useState(false);
  const [showImageField, setShowImageFiled] = useState(true);

  const [eventList, setEventList] = useState([{}]);

  


  //Backend Code to interact with the database

  //bring events from DB
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEventList(data);
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
    await fetch("/api/events", {
      method: "PUT",
      body:formData,
    });
    setEventList(
      eventList.map((event) =>
        event._id === id
          ? { ...event, name: newName, date: newDate, avatar: newAvatar }
          : event
      )
    );
  }


  return (
    <div className="h-screen flex">
      {/* NavBar */}
      <div className="w-1/5 h-2/3 bg-[#1A1A1A] m-4 mt-7">
        <div className="w-full h-2/5">
          {/* Title and logo div */}
          <div className="flex items-center justify-items-end pt-3 ">
            <div>
              <Image
                src={"/images/maoonaLogo.png"}
                alt="logo"
                width={125}
                height={0}
                className="relative right-4 "
              />
            </div>
            <div>
              <h1 className="text-2xl relative right-7 font-sans">Maoona</h1>
            </div>
          </div>
          {/* Create Event button div */}
          <div className="bg-gradient-to-b from-[#3a49df] to-[#9499de] h-12 w-2/3 mx-auto rounded-lg hover:opacity-75">
            <button
              className=" w-full flex  items-center h-full justify-around text-lg"
              onClick={() => setShowEventFields(true)}
            >
              <BsCalendar2EventFill className="" />
              <div>Create an Event </div>
            </button>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <button className="flex bg-gradient-to-b from-[#0c0e10]  to-[#9499de]/35  h-12 w-full  items-center  text-lg pl-4 rounded-lg transition-all duration-200 hover:opacity-75">
                <MdOutlineMenuBook className="text-2xl mr-4" />
                <span>Overview</span>
              </button>
            </li>
            <li className="mt-5">
              <button className="flex bg-gradient-to-b from-[#0c0e10]  to-[#9499de]/35  h-12 w-full  items-center  text-lg pl-4 rounded-lg transition-all duration-200 hover:opacity-75">
                <FaBoxes className="text-2xl mr-4" />
                <span>Events</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className=" h-fit  w-full flex flex-wrap  ">
        {eventList.map((event, index) => (
          <Events
            key={index}
            eventId={event.id}
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
        <EventFields
          showEventFields={showEventFields}
          setShowEventFields={setShowEventFields}
          eventList={eventList}
          setEventList={setEventList}
          showImageField={showImageField}
        />
      )}
      {/* <div>
      <h1>Click n=on the link please!</h1>
      <a href="api/auth/signin"> sign IN with github</a>
    </div> */}
    </div>
  );
}

export default Home;

