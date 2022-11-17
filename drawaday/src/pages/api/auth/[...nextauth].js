import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';


export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
})

// const options = {
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET
//     }),
//   ],
//   debug: false
// }

// export default (req, res) => NextAuth(req, res, options)