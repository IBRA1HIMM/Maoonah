import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const users=[{id:1,name:"Gustave",email:"Gustave@Jaicom.com",password:"123456"}]



export const authOptions = {
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId:process.env.GOOGLE_CLINET_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECERT,
    }),

    //configration for email and password
    CredentialsProvider({
  name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
},

// check if the submited inofs exits in databse we are using an array for now
async authorize(credentials){
  const user = users.find(u =>u.email ==credentials.email && u.password ==credentials.password);
  if(!user){
    throw new Error("Email not found")
  }
  else {
    return user
  }
}
})
  ],

  pages:{
    signIn:"/"
  },
  secret: process.env.NEXTAUTH_SECRET, 

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

