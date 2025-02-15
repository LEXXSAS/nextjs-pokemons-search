import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60 * 1000 // 15 minutes
  },
  callbacks: {
    async jwt({ token }) {
    if (!token.email) {
      return token;
    }
    
    // const findUser = await prisma.user.findFirst({
    //   where: {
    //     email: token.email
    //   }
    // });

    // if (findUser) {
    //   token.id = String(findUser.id);
    //   token.role = findUser.role;
    //   token.fullName = findUser.fullName;
    //   token.email = findUser.email;
    // }

    return token;
   },
    session: ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    }
  }
}


// token google data

// name: string
// email: string
// picture: string
// sub: string
// iat: number
// exp: number
// jti: string
