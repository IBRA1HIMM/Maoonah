import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

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

