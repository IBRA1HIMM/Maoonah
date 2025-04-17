import {useState} from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function NavBar({setShowEventFields}) {
  return(
    <div className="w-1/5 h-2/3 bg-[#1A1A1A] m-4 mt-7 flex flex-col">
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
    <div className="flex-grow flex  items-end" >
      <button className=" h-10 w-10 pl-2 pb-2 " onClick={()=>signOut({ callbackUrl: "/" })}>
        <CiLogout className="text-3xl text-blue-400"/>
      </button>
    </div>
  </div>
  );
}

export default NavBar;
