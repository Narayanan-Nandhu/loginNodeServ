[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Narayanan-Nandhu/loginNodeServ/issues)


# loginNodeServ

### Description 

Simple Authentication module for **Express-react** applications. Need of this module is to have a common modular base code which can be reused in smaller or Pet 
projects for a faster development.

### what it includes 🤔 

It support below Passport Authentications Strategies
  * Google Authentication
  * Passport-Local Authentication


## Installation

```
npm install nodeloginserv
```

## Quick Start

### Prerequisite

After successfull Installation, need to specify the environmental variables that are required for this module.

To get your own google auth sign-in screen, follow [this](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) procedure.

```
GOOGLE_CLIENT_ID=********************
GOOGLE_CLIENT_SECRET=*******************
MONGO_URI=mongodb://localhost:27017
NODE_ENV=development
PORT=8000
PASSWORD_PASSWORD_ENCRYPTION_KEY=******************
```

Once it is environment variables are configured, you can import the `authenticateServ` from the nodeloginserv. 

While calling the ```authenticateServ```, you can pass the config Object as the Optional params defining the Authenctication strategies needed and Endpoints.

By default the app config, will be the following one.

```
 DEFAULT_APP_CONFIG: {
        PASSPORT_LOCAL_AUTHENTICATION: true,
        GOOGLE_AUTHENTICATION: true,
        ROUTES_ENDPOINTS: {
            PASSPORT_LOCAL: {
                SIGN_UP: '/local/auth/signup',
                SIGN_IN: '/local/auth/signin',
                SIGN_IN_FAILED: '/local/auth/failed',
                SIGN_UP_SUCCESS: '/local/auth/success',
                SIGN_UP_FAILED: '/local/auth/failed',
                LOGOUT: '/api/logout',
                GET_USER: '/api/current_user',
                LOGOUT_REDIRECT_URI: '/home'
            },
            GOOGLE_AUTH: {
                SIGNUP_URI: '/auth/google',
                CALLBACK_URI: '/oauth2/redirect/google',
                GAUTH_SUCCESS: 'gauth/success',
                LOGOUT: 'api/logout',
                GET_USER: 'api/current_user',
                LOGOUT_REDIRECT_URI: '/home'
            }
        }
    }
```
If you wants to customize the app config you can pass the ```CUSTOM_APP_CONFIG``` , as shown below

```
import authenticateServ from 'nodeloginserv';
import express from 'express';
...

const CUSTOM_APP_CONFIG = {  
   GOOGLE_AUTHENTICATION: true, 
   GOOGLE_AUTHENTICATION: false ,
   GOOGLE_AUTH: {
    SIGNUP_URI: '/gauth/google',
    CALLBACK_URI: '/auth/callback/google',
   }
 }

const app = express();
authenticateServ(app, CUSTOM_APP_CONFIG);
```









  
 
  
 

