"use client";
import { useState } from "react";
import DebtCard from "../../components/DebtCard";
import EventFields from "../../components/EventFields";
import { BsCalendar2EventFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";

function EventRecords() {
  const [showImageField, setShowImageFiled] = useState(false);
  const [recordList, setRecord] = useState([
    {
      name: "Rakan Mohamed Easa Bahni",
      money: 70000,
    },
  ]);
  const [showEventFields, setShowEventFields] = useState(false);
  const [showMoney, setShowMoney] = useState(true);
  const [comingFromRecordPage, setComingFromRecordPage] = useState(true);

  const DeleteRecord = (name) => {
    setRecord(recordList.filter((record) => record.name !== name));
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

  return (
    <div className="h-screen">
      <div className="bg-gradient-to-b from-[#3a49df] to-[#9499de] h-12 w-1/6   mx-auto relative top-3 rounded-full hover:opacity-75">
        <button
          className=" w-full flex  items-center h-full  justify-center text-lg"
          onClick={() => setShowEventFields(true)}
        >
          <CiCirclePlus className=" text-3xl mr-3" />
          <div>Create A Record</div>
        </button>
      </div>
      <div className="flex flex-wrap">
        {recordList.map((record, index) => (
          <DebtCard
            key={index}
            name={record.name}
            money={record.money}
            DeleteRecord={() => DeleteRecord(record.name)}
            setShowEventFields={setShowEventFields}
            comingFromRecordPage={comingFromRecordPage}
            UpdateRecord={(newName, newMoney) =>
              UpdateRecord(record.name, newName, newMoney)
              
            }
          />
        ))}
      </div>
      <EventFields
        showEventFields={showEventFields}
        setShowEventFields={setShowEventFields}
        showImageField={showImageField}
        recordList={recordList}
        setRecord={setRecord}
        showMoney={showMoney}
        comingFromRecordPage={comingFromRecordPage}
      />
    </div>
  );
}

export default EventRecords;
