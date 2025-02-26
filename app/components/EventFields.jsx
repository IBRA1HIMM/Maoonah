"use client";


import { useState } from "react";
import { create } from "zustand";
import useEventValuesStore from "../store/useEventValuesStore";

function EventFields({
  showEventFields,
  setShowEventFields,
  eventList,
  setEventList,
  showImageField=true,
  isUpdating,
  handelUpdate,
  setRecord,
  recordList,
  showMoney,
  comingFromRecordPage,
oldEventName,oldEventDate,oldEventAvatar
  
}) 

{

  // const { setStoredValues } = useEventValuesStore();

  const [eventValues, setEventValues] = useState(
    isUpdating ?{
      name:oldEventName ,
      date:oldEventDate,
      avatar: oldEventAvatar,
    }
    
    :{
     
    name: "",
    date: "",
    avatar: null,
  });

  const handelValues = (value, key) => {
    if (key == "avatar") {
      // const imageUrl = URL.createObjectURL(value);
      setEventValues({ ...eventValues, [key]: value });
    } else {
      setEventValues({ ...eventValues, [key]: value });
     
     
    }
  };
  async function addEventToDataBase(event){

const formData= new FormData();
formData.append("name",event.name)
formData.append("date",event.date)
formData.append("avatar",event.avatar)

    const res= await fetch("/api/events",{
      method:"POST",
      body:formData,
  
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to add event this is the one working no doubt:", errorData.error);
      return;
    }
   
      const newEvent=await res.json();
      console.log("this is the new Event avatar :", newEvent.avatar);   
      setEventList([...eventList,newEvent]);
  }

  const handelSubmit = () => {
    // i just got too excited
    // setStoredValues(eventValues);

    if(isUpdating && comingFromRecordPage){

      handelUpdate(eventValues.name,eventValues.money)
    }
    else if(isUpdating){
      handelUpdate(eventValues.name,eventValues.date,eventValues.avatar)

    }
// for Updating the record inside The Event  in the Event Record Page
  else if(comingFromRecordPage){
setRecord([...recordList,eventValues])
  }
    else{
      // for Updating the event List in the Home page
      addEventToDataBase(eventValues)

      // Before the database and all the fun stuff (:
    // setEventList([...eventList, eventValues]);
    }
    setShowEventFields(false);

  
    
  };
  return (
    <>
      {showEventFields && (
        <div className="absolute top-[20%] left-1/3 z-30 bg-[#1A1A1A] w-[540px]">
          <div className=" p-8 flex flex-col gap-y-8 h-full">
            <div className="flex items-center">
              <label htmlFor="" className=" w-1/3">
                Event Name
              </label>
              <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                  type="text"
                  placeholder="name of the event"
                  onChange={(e) => handelValues(e.target.value, "name")}
                />{" "}
              </div>
            </div>
            {showMoney && ( <div className="flex items-center">
              <label htmlFor="" className=" w-1/3">
                Mony Amount
              </label>
              <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                  type="text"
                  placeholder="How much"
                  onChange={(e) => handelValues(e.target.value, "money")}
                />{" "}
              </div>
            </div>)}
           {!showMoney &&( <div className="flex items-center">
              <label htmlFor="" className=" w-1/3">
                Event Date
              </label>
              <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                  type="Date"
                  placeholder="name of the event"
                  onChange={(e) => handelValues(e.target.value, "date")}
                />{" "}
              </div>
            </div>)}

            {/* Hiding Image field for Record page */}
            {showImageField && (
              <div className="flex items-center">
                <label htmlFor="" className=" w-1/3">
                  Event Avatar
                </label>
                <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                  <input
                    className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                    type="file"
                    placeholder="name of the event"
                    onChange={(e) => handelValues(e.target.files[0], "avatar")}
                  />{" "}
                </div>
              </div>
            )}
            <div className="flex   h-full relative top-7 justify-between">
              <button
                onClick={() => setShowEventFields(false)}
                className="bg-gradient-to-b from-[#df3a3a] to-[#e80d0d] w-24 h-11 rounded-md"
              >
                cancel
              </button>
              <button
                onClick={handelSubmit}
                className="bg-gradient-to-b from-[#3a49df] to-[#9499de] w-24 h-11 rounded-md"
              >
                add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventFields;
