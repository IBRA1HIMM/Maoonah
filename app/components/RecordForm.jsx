"use client";
import { useState } from "react";
import { stringify } from "postcss";
import { getSession } from "next-auth/react";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";
import {v4 as uuidv4} from "uuid"

function RecordForm({
  showEventFields,
  setShowEventFields,
  isUpdating,
  handelUpdate,
  setRecord,
  recordList,
  eventId
}) {
  const [recordValues, setRecordValues] = useState({
    name: "",
    money: 0,
  });

  async function addToDataBase(record){

const completeRecord={...record,eventId};
const sesstion = await getSession();
if (sesstion){
const res= await fetch("/api/records/",{
  method:"POST",
headers:  { "Content-Type": "application/json" },
  body:JSON.stringify(completeRecord)
})


if(res.ok){
  setRecord([...recordList,completeRecord])
 
}
}
else{
  //storing record in local storage with the eventId to know which record belong to which event
  
  const recordWithId={...recordValues,eventId,recordId:uuidv4()}
 const allRecords=[...loadFromLocal("guest_records") || [],recordWithId]
    saveToLocal("guest_records",allRecords);
      const storedRecords=loadFromLocal("guest_records")
      const filterdRecords= storedRecords.filter((record)=>record.eventId == eventId );
      setRecord(filterdRecords)
}

  }

  const handelSubmit = () => {
    // i just got too excited
    // setStoredValues(eventValues);

    //updating record of an event
    if (isUpdating) {
      handelUpdate(recordValues.name, recordValues.money);
    }
   else {
    // add a record to record list
    addToDataBase(recordValues)
    
    }
    setShowEventFields(false);
  };

  return (
    <>
      {showEventFields && (
        <div className="absolute top-[20%]  z-30 bg-[#1A1A1A] md:w-[540px] w-full md:left-1/3">
          <div className=" p-8 flex flex-col gap-y-8 h-full">
            <div className="flex items-center">
              <label htmlFor="" className=" w-1/3">
                Name
              </label>
              <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                  type="text"
                  placeholder="name of the Donar"
                  onChange={(e) => setRecordValues({...recordValues,name:e.target.value})}
                />{" "}
              </div>
            </div>

            <div className="flex items-center">
              <label htmlFor="" className=" w-1/3">
                Mony Amount
              </label>
              <div className=" w-full h-8 border-gray-500 border-solid border-2  ">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-2 ring-[#3a49df] rounded-sm w-full h-full border p-2"
                  type="text"
                  placeholder="How much"
                  onChange={(e) => setRecordValues({...recordValues,money:e.target.value})}
                />{" "}
              </div>
            </div>

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
                add record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecordForm;
