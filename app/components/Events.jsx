"use client";
import { useState,useEffect,useRef } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import useEventValuesStore from "../store/useEventValuesStore";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import EventForm from "./EventForm";
import { getSession } from "next-auth/react";


function Events({ Avatar, Name, Date, DeleteEvent, UpdateEvent,eventId }) {
  
  
  const [menu, setMenu] = useState(false);
  const [isLogged,setIsLogged] =useState(false)

  const [showEventFields, setShowEventFields] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const menuRef=useRef(null)


useEffect(()=>{
const handleClickOutside=(event)=>{
  if (menuRef.current && !menuRef.current.contains(event.target)) {
    setMenu(false);
  }
}
async function checkSession(){
  const session = await getSession();
  if(session) setIsLogged(true)
    else setIsLogged(false)
}
checkSession();

document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
},[])
async function LoggedIn(){
const session = await getSession();
if (session) return true
else return false
}
  const handelUpdate = (newName, newDate,newAvatar) => {
      
      console.log("this the new Aavatar URl before going to update function ",newAvatar)

    UpdateEvent(eventId,newName, newDate,newAvatar instanceof File ? newAvatar : null);

    setMenu(false);
  };
  return (
    <div className="my-11 mx-2 md:w-40">
      <div className="bg-gradient-to-tl from-[#4c4e50] to-[#131517]    rounded-md  relative">
        {menu && (
          <div ref={menuRef} className="bg-gray-700 w-24 z-30  absolute right-[-84px] top-8">
            {isLogged&&(<button
             onBlur={() => setTimeout(() => setMenu(false), 200)} // Delay to allow clicking menu items
              onClick={() => {
                setShowEventFields(true);
                setIsUpdating(true);
                setMenu(false)
              }}
              className="hover:bg-slate-50 w-full p-3 text-blue-300 "
            >
              Update
            </button>
            )}
            <button
              onClick={() =>{ 
                DeleteEvent()
                setMenu(false)
              }}
              className="text-red-600 w-full p-3 hover:bg-slate-50 "
            >
              Delete
            </button>
          </div>
        )}
        {/* first row div for the image and the three dots */}
        <div className="flex justify-between">
          <div className="bg-red-400 w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-[50%] ml-2 ">
          <Image
            src={Avatar || "/images/EventPhoto.png"}
            alt="image"
            width={80}
            height={80}
            className="w-full h-full object-cover object-center"
          />
          </div>
          <button className="h-fit" onClick={() => setMenu(!menu)}>
            <HiOutlineDotsVertical className="m-2 text-xl " />
          </button>
        </div>
        <div className="m-6 flex flex-col justify-evenly  h-1/4">
          <h2>{Name || "Event Name"}</h2>
          <h3>{Date || "Date :1446"}</h3>
        </div>
        <div className="m-3 ">
          <Link href={`/EventRecords/${eventId}`}>
            <button className="flex w-10/12 justify-evenly items-center">
              <span>See more</span>
              <FaArrowRight />
            </button>
          </Link>
        </div>

      </div>
      {showEventFields && (
          <EventForm
          showEventFields={showEventFields}
            setShowEventFields={setShowEventFields}
            handelUpdate={handelUpdate}
            isUpdating={isUpdating}
            oldEventName={Name}
            oldEventDate={Date}
            oldEventAvatar={Avatar}
          />
        )}
      </div>
    
  );
}

export default Events;
