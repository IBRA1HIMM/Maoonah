"use client";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import EventFields from "./EventFields";

function DebtCard({
  name,
  money,
  DeleteRecord,
  UpdateRecord,
  comingFromRecordPage,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showEventFields, setShowEventFields] = useState(false);
  const [showMoney, setShowMoney] = useState(true);

  const handelUpdate = (newName, newMoney) => {
    UpdateRecord(newName, newMoney);
    setMenu(false);
  };

  return (
    <div>
      <div className="bg-gradient-to-tl from-[#4c4e50] to-[#131517] w-80 h-20   rounded-md mt-20 ml-5 relative">
        {menu && (
          <div className="bg-gray-700 w-24 z-30  absolute right-[-84px] top-8">
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
              onClick={() => DeleteRecord(name)}
              className="text-red-600 w-full p-3 hover:bg-slate-50 "
            >
              Delete
            </button>
          </div>
        )}
        <div className=" flex flex-col justify-evenly  h-1/4">
          <div className="flex justify-between items-start">
            <h2 className="p-2">{`name : ${name} ` || "Event Name"}</h2>
            <button className="h-fit" onClick={() => setMenu(!menu)}>
              <HiOutlineDotsVertical className="m-2 text-xl " />
            </button>
          </div>
          <h3 className="pl-3">
            {`money received : ${money} $` || "Date :1446"}
          </h3>
        </div>
      </div>
      {showEventFields && (
        <EventFields
          setShowEventFields={setShowEventFields}
          showEventFields={showEventFields}
          handelUpdate={handelUpdate}
          isUpdating={isUpdating}
          showMoney={showMoney}
          comingFromRecordPage
        />
      )}
    </div>
  );
}

export default DebtCard;
