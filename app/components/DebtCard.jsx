"use client";
import { useState,useEffect,useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import EventFields from "./EventFields";
import RecordForm from "./RecordForm";

function DebtCard({
  name,
  money,
  DeleteRecord,
  UpdateRecord,
  comingFromRecordPage,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef=useRef(null)
  const [showEventFields, setShowEventFields] = useState(false);
  const [showMoney, setShowMoney] = useState(true);

useEffect(()=>{
const handelClickOutside=(event)=>{
if(menuRef.current && !menuRef.current.contains(event.target))  setMenu(false)
}
document.addEventListener("mousedown", handelClickOutside);
return () => document.removeEventListener("mousedown", handelClickOutside);

},[])

  const handelUpdate = (newName, newMoney) => {
    UpdateRecord(newName, newMoney);
    setMenu(false);
  };

  return (
    <div>
      <div className="bg-gradient-to-tl from-[#4c4e50] to-[#131517] md:w-80  w-56  rounded-md mt-20 ml-5 relative">
        {menu && (
          <div className="bg-gray-700 w-24 z-30  absolute right-[-84px] top-8" ref={menuRef}>
            <button
              onClick={() => {
                setShowEventFields(true);
                setIsUpdating(true);
              }}
              className="hover:bg-slate-50 w-full p-3 text-blue-300 "
            >
              Update
            </button>

            <button
              onClick={() => DeleteRecord()}
              className="text-red-600 w-full p-3 hover:bg-slate-50 "
            >
              Delete
            </button>
          </div>
        )}
        <div className=" flex flex-col ">
          <div className="flex justify-between ">
            <h2 className="p-2">{`name : ${name} ` || "Event Name"}</h2>
            <button className="h-fit" onClick={() => setMenu(!menu)}>
              <HiOutlineDotsVertical className="m-2 text-xl " />
            </button>
          </div>
          <h4 className="pl-2">
            {`money received : ${money} $` || "Date :1446"}
          </h4>
        </div>
      </div>
      {showEventFields && (

        //linked in post

        // <EventFields
        //   setShowEventFields={setShowEventFields}
        //   showEventFields={showEventFields}
        //   handelUpdate={handelUpdate}
        //   isUpdating={isUpdating}
        //   showMoney={showMoney}
        //   comingFromRecordPage
        // />

        <RecordForm
        showEventFields={showEventFields}
        setShowEventFields={setShowEventFields}
        handelUpdate={handelUpdate}
        isUpdating={isUpdating}
      />
      )}
    </div>
  );
}

export default DebtCard;
