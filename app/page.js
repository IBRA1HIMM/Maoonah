"use client"
import { useSession,signIn} from "next-auth/react";
import Link from "next/link";
import {useState} from "react"

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
 
    return (
<div className="flex justify-center items-center h-screen">
      <div className="h-fit w-[90%] max-w-md bg-[#1A1A1A] p-8 rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-white text-lg mb-6 text-center"> You can sign in or Enter in guest mode</h1>
        

        {/* Email/Password Form */}
        {/* <form className="w-full flex flex-col gap-4 mb-6" >
          <input
            type="email"
            className="px-4 py-2 rounded bg-gray-800 text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="px-4 py-2 rounded bg-gray-800 text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Sign In with Email
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form> */}

        <div className="text-gray-400 mb-6">or sign in with github</div>


        {/* GitHub Sign-In */}
        <Link href="/Home">
  <button
    className="mb-6 bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
  >
    Enter in guest Mode
  </button>
</Link>
         <button
          className="mb-6 bg-red-900 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => signIn('google',{callbackUrl:"/Home"})}
        >
          Sign In with Google
        </button>
      </div>
    </div>

      // <div className="flex justify-center items-center h-screen">
      // <div className=" h-2/3 w-1/4 bg-[#1A1A1A] flex flex-col items-center justify-center  rounded-lg">
      //   <div className="w-full flex flex-col items-center ">
      //     <div className="w-5/6 "><input className="w-full bg-cyan-800 h-full" /></div>
      //   </div>
      //   <h1 className="mb-24">Access Denied You should sign in first!</h1>
      //   <button className="mb-14"  onClick={()=>signIn("github",{callbackUrl:"/Home"})}>Sign In</button>
      // </div>
      // </div>
    )

}

export default SignIn;
