import express, { Application } from "express";
import mongoose from "mongoose";
import passport from "passport";
import googleAuthenticationService from './passport/googleAuth';
import {AuthenticationRouter, GoogleAuthRouter, LocalAuthRouter} from './routes/authRouter';
import session from 'express-session';
import Utils from './utils/index'
import CONSTANTS from "./utils/constants";
import localAuthenticationPassportServ from "./passport/localAuth";
import bodyParser from "body-parser";

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5001
let randomKey = Utils.alphaNumericString(13);
const ENV = process.env.NODE_ENV;
const USERDB =  ENV === CONSTANTS.TESTPACKAGE ? CONSTANTS.TESTPACKAGE_USER : CONSTANTS.PRODUCTION_USER;

export const authenticateServ = (app : Application) => {

    mongoose.connect(process.env.MONGO_URI+ `/${USERDB}`).then(() => {
        console.info('Connected to Mongo DB');
    }).catch((error) => {
        console.error("Oh no connection error");
        console.error(error);
    })

    googleAuthenticationService(passport);
    localAuthenticationPassportServ(passport);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    app.use(session({
        secret: randomKey,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 2 * 60 * 1000 } // 2 minutes
    }))

    app.use(passport.initialize());
    app.use(passport.session())
    app.use(GoogleAuthRouter)
    app.use(AuthenticationRouter)
    app.use(LocalAuthRouter)
}

if (process.env.NODE_ENV === CONSTANTS.TESTPACKAGE) {
    authenticateServ(app)
    app.listen(PORT, () => {
        console.info("[%s] Login Node Service started listening to the port [%d]", process.env.NODE_ENV, PORT)
    })
}

export default app;