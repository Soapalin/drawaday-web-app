# NextAuth.js
<br>

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



