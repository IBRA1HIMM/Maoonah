"use client";
import { useState,useEffect } from "react";
import DebtCard from "../../components/DebtCard";
import { BsCalendar2EventFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from "next/navigation";
import RecordForm from "@/app/components/RecordForm";
import { loadFromLocal } from "@/app/utils/localStorage";
import { getSession } from "next-auth/react";


function EventRecords() {
  const {eventId}=useParams();
  const [recordList, setRecord] = useState([
    {
      name: "Rakan Mohamed Easa Bahni",
      money: 70000,
    },
  ]);
  const [showEventFields, setShowEventFields] = useState(false);
  const [comingFromRecordPage, setComingFromRecordPage] = useState(true);

  const mockupData={
    "67c97cb4a56ddb49bf622ce6":[
      {name:"Easa",money:20000},
      {name:"Hadu=i",money:20500},
      {name:"Noufel",money:30100},

    ],
    "67e9829c2f6ab8fb22991c93":[
      {name:"bloodborne",money:20000},
      {name:"darksouls",money:20500},
      {name:"sekiro",money:30100},
    ]
  }
    const fetchRecords= async (eventId)=>{
      const session=await getSession();
      if(session){
     const res= await fetch(`/api/records?eventId=${eventId}`,{
        method:"GET",
        headers: { "Content-Type": "application/json" },
       
      })
      const respond= await res.json();

    if (respond.length === 0) return 
     
      setRecord([...recordList,...respond])
      }
      else{
      //tranvirsing the local storage to find the records associated with that eventId
    const storedRecords=loadFromLocal("guest_records")
      const filterdRecords= storedRecords.filter((record)=>record.eventId == eventId );
      setRecord(filterdRecords)
      }
    }

  const DeleteRecord = async(recordId,recordGuestId) => {
    const session = await getSession();
    if(session){
    const res = await fetch("/api/records/",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(recordId)
    })
    const{message}= await res.json()
    if(res.ok){
      console.log(message);
    setRecord(recordList.filter((record) => record._id !== recordId));

    }
    else{
      console.error("Failed to delete record", message);
    }
  }
  else{
    console.log("this is the record id ", recordGuestId)
     setRecord(recordList.filter((record) => record.recordId !== recordGuestId))
  }
  };

  const UpdateRecord = (name, newName, newMoney) => {
    setRecord(
      recordList.map((record) =>
        record.name === name
          ? { ...record, name: newName, money: newMoney }
          : record
      )
    );
  };

  useEffect(()=>{
if(eventId){
  fetchRecords(eventId)

}
  },[])
  return (
    <div className="h-screen">
      <div className="bg-gradient-to-b from-[#3a49df] to-[#9499de] h-12 md:w-2/6  w-full md:mx-auto relative top-3 rounded-full hover:opacity-75">
        <button
          className=" w-full flex  items-center h-full  justify-center text-lg"
          onClick={() => setShowEventFields(true)}
        >
          <CiCirclePlus className=" text-3xl mr-3" />
          <div>Create A Record</div>
        </button>
      </div>
      <div className="flex flex-wrap   items-center justify-center">
        {recordList.map((record, index) => (
          <DebtCard
            key={index}
            name={record.name}
            money={record.money}
            DeleteRecord={() => DeleteRecord(record._id,record.recordId)}
            setShowEventFields={setShowEventFields}
            comingFromRecordPage={comingFromRecordPage}
            UpdateRecord={(newName, newMoney) =>
              UpdateRecord(record.name, newName, newMoney)
              
            }
          />
        ))}
      </div>
      <RecordForm
        showEventFields={showEventFields}
        setShowEventFields={setShowEventFields}
        recordList={recordList}
        setRecord={setRecord}
        eventId={eventId}
      />
    </div>
  );
}

export default EventRecords;
