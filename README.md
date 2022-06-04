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
> npm install nodeloginserv
```

## Quick Start

### Prerequisite

After successfull Installation, need to specify the environmental variables that are required for this module.

```
GOOGLE_CLIENT_ID=********************
GOOGLE_CLIENT_SECRET=*******************
MONGO_URI=mongodb://localhost:27017
NODE_ENV=development
PORT=8000
PASSWORD_ENCRYPTION_KEY=******************
```

Once it is configured, you can import the `authenticateServ` from the nodeloginserv

```
import authenticateServ from 'nodeloginserv';
import express from 'express';
...

const app = express();
authenticateServ(app);
```









  
 
  
 

