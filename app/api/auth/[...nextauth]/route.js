import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"

// const handler=NextAuth({
//     providers:[
//         GitHubProvider({
//             clientId:process.env.GITHUB_CLIENT_ID,
//             clientSecret:process.env.GITHUB_CLIENT_SECRET,
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,


//     callbacks:{
//         async jwt({token,user}){
//             if(user){
//                 token.id=user.id;
//             }
//             return token;
//         },
//         async session({session,token}){
//             session.user.id=token.id;
//             return session;
//         },
//     },
//     debug: process.env.NODE_ENV==="development"
// })
// const handler = NextAuth(authOptions);

// export {handler as GET,handler as POST}



export const authOptions = {
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  pages:{
    signIn:"/"
  },
  secret: process.env.NEXTAUTH_SECRET, 

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

