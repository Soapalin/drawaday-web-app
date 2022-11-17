# NextAuth.js
<br>
This document is more focused on Google SSO.

## Prerequisites

- A Google account
- An existing Next.js app
<br>


###  Google OAuth Setup

// TODO: to be added in the future when Google SSO is created 

<br>
<br>



## NextAuth.js Install 

This repo is created with NextAuth.js already. So no dependencies are further needed.

If the repo is just vanilla next.js, do the following:

```shell
cd /opt/dev/my-nextjs-app
npm i -s next-auth
```
<br>

## Initial Setup 

After the prerequisites and dependencies sorted out, it is time to create the config file for NextAuth.js setup. You will need to create a .env file in the root of the project directory if there isn't one yet.

Please look at the file called .env.local.example for the example config file that is expected.

Here is a little snippet of the `.env` file:

```
NEXTAUTH_URL=https://myapp.domain.com
GOOGLE_ID=abc123
GOOGLE_SECRET=abc123
```

The NEXTAUTH_URL is the URL at which your application will be running. You can set multiple URLs for different environments by setting up multiple .env files, like .env.production, .env.development, etc. The same is possible in almost any hosting provider's environment variables setup section (i.e. with Netlify or Vercel, etc.). The GOOGLE_ID and GOOGLE_SECRET are our OAuth keys we received from the Google developer console earlier!

<br>

### Create a Next.js API for authentication 

The location of the API for authentication needs to be at the following: `pages/api/auth/[...nextauth].js`

Then, you should add the following snipper in it:

```js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  debug: false
}

export default (req, res) => NextAuth(req, res, options)
```


More config options can be found in the docs - https://next-auth.js.org/configuration/options

If you'd like to permanently store the users/accounts in a database, NextAuth.js makes it really easy to add sqlite for testing or various other adapters such as MySQL, Postgres, MongoDB (via TypeORM), FaunaDB, Firebase, DynamoDB, and Prisma. More information on database details can be found in their docs - https://next-auth.js.org/adapters/overview


<br>

The app needs to be wrapped in a NextAuth provider, so add the following snippet to `pages/_app.js` or create the file if it has not been done yet:

```javascript
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
```

By wrapping the whole application in this provider, React Context can be used to make `useSession` hook available in any page / component in the app and share session state.


The library includes some basic Login / Logout pages by default, so there's no need to write them. Those pages can be customised by following the instructions here - https://next-auth.js.org/configuration/pages


## Restricting Page Access 