"use client";
import { useSession,signIn,signOut } from "next-auth/react";

function SignIn() {


 
    return (
      <div className="flex justify-center items-center h-screen">
      <div className=" h-2/3 w-1/4 bg-[#1A1A1A] flex flex-col items-center justify-center  rounded-lg">
        <h1 className="mb-24">Access Denied You should sign in first!</h1>
        <button className="mb-14"  onClick={()=>signIn("github",{callbackUrl:"/Home"})}>Sign In</button>
      </div>
      </div>
    )


  


}

export default SignIn;
