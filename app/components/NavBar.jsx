"use client";
import {useState} from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { TbXboxX } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";



function NavBar({setShowEventFields}) {
const [showNavbar,setNavbar]=useState(true);

  return(
    
   showNavbar ?( 
    <div className="flex flex-col absolute md:static z-20 md:w-64 w-full md:h-[90vh] h-auto bg-[#1A1A1A] md:m-4 md:mt-7  p-4 rounded-lg ">
    <div className="w-full h-2/5">
      {/* Title and logo div */}
      <div className="flex items-center justify-between  mb-6">
        <div className="flex items-center md:justify-start gap-3">
          <Image
            src={"/images/maoonaLogo.png"}
            alt="logo"
            width={50}
            height={50}
            
          />
          <h1 className="text-lg font-sans">Maoona</h1>

        </div>
        <div>
          <TbXboxX className="text-3xl text-cyan-700 md:hidden" onClick={()=>setNavbar(false)}/>
        </div>
      </div>
      {/* Create Event button div */}
      <div className="bg-gradient-to-b from-[#3a49df] to-[#9499de] h-12 w-10/12 md:w-full  mx-auto my-6 rounded-lg hover:opacity-75 ">
        <button
          className=" w-full flex  items-center h-full justify-center gap-2"
          onClick={() => {
            setShowEventFields(true)
          
          }}
        >
          <BsCalendar2EventFill  />
          <span className="text-sm" >Create an Event</span>
        </button>
      </div>
    </div>
    <div>
      <ul>
        <li>
          <button className="flex bg-gradient-to-b from-[#0c0e10]  to-[#9499de]/35 w-10/12  h-10 md:w-full  items-center mx-auto justify-center md:justify-start text-base gap-2   pl-4 rounded-lg transition-all duration-200 hover:opacity-75">
            <MdOutlineMenuBook className="text-xl " />
            <span>Overview</span>
          </button>
        </li>
        <li className="mt-5">
          <button className="flex bg-gradient-to-b from-[#0c0e10]  to-[#9499de]/35  h-10 w-10/12 mx-auto md:w-full  items-center justify-center md:justify-start text-base gap-2  pl-4 rounded-lg transition-all duration-200 hover:opacity-75">
            <FaBoxes className="text-xl " />
            <span>Events</span>
          </button>
        </li>
      </ul>
    </div>
    <div className="mt-6 md:mt-auto flex-grow flex  items-end" >
      <button className=" h-10 w-10 pl-2 pb-2 " onClick={()=>signOut({ callbackUrl: "/" })}>
        <CiLogout className="text-3xl text-blue-400"/>
      </button>
    </div>
    </div>) : (
      <div className="bg-slate-800 absolute top-3 left-4 h-fit text-2xl rounded-xl" onClick={()=>setNavbar(true)}>
        <IoMenu />
      </div>
    )
  );
}

export default NavBar;
