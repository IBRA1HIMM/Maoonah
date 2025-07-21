// import {withAuth} from "next-auth/middleware";

// export default withAuth({
//     pages:{
//         signIn:"/",
//     }
// })

import { NextResponse } from "next/server";
export default function middleware() {
  return NextResponse.next(); // Allows all requests
}