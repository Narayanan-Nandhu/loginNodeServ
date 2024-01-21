import express, { Application } from "express";
import mongoose from "mongoose";
import passport from "passport";
import googleAuthenticationService from './passport/googleAuth';
import { AuthenticationRouter, GoogleAuthRouter, LocalAuthRouter, initializeRoutes } from './routes/authRouter';
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

type APP_CONFIG = {
    PASSPORT_LOCAL_AUTHENTICATION?: Boolean,
    GOOGLE_AUTHENTICATION?: Boolean,
    MONGO_DB_NAME: String,
    ROUTES_ENDPOINTS?: {
        PASSPORT_LOCAL?: {
            SIGN_UP?: String,
            SIGN_IN?: String,
            SIGN_IN_FAILED?: String,
            SIGN_UP_SUCCESS?: String,
            SIGN_UP_FAILED?: String,
            LOGOUT?: String,
            GET_USER?: String,
            LOGOUT_REDIRECT_URI?: String
        },
        GOOGLE_AUTH?: {
            SIGNUP_URI?: String,
            CALLBACK_URI?: String,
            GAUTH_SUCCESS?: String,
            LOGOUT?: String,
            GET_USER?: String,
            LOGOUT_REDIRECT_URI?: String
        }
    }
}

let DEFAULT_APP_CONFIG = { ...CONSTANTS.DEFAULT_APP_CONFIG }

export const authenticateServ = (app: Application, CUSTOM_APP_CONFIG?: APP_CONFIG) => {

    const { PASSPORT_LOCAL_AUTHENTICATION, GOOGLE_AUTHENTICATION } = CUSTOM_APP_CONFIG || DEFAULT_APP_CONFIG;

    const DB_NAME = ENV === CONSTANTS.TESTPACKAGE ? CONSTANTS.TESTPACKAGE_USER : (CUSTOM_APP_CONFIG?.MONGO_DB_NAME) ? CUSTOM_APP_CONFIG?.MONGO_DB_NAME : CONSTANTS.PRODUCTION_USER;

    app.set('APP_CONFIG', { ...DEFAULT_APP_CONFIG, ...CUSTOM_APP_CONFIG });

    mongoose.connect(process.env.MONGO_URI + `/${DB_NAME}`).then(() => {
        console.info('Connected to Mongo DB');
    }).catch((error) => {
        console.error("Oh no connection error");
        console.error(error);
    })

    initializeRoutes(app);
    GOOGLE_AUTHENTICATION && googleAuthenticationService(passport);
    PASSPORT_LOCAL_AUTHENTICATION && localAuthenticationPassportServ(passport);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: randomKey,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 2 * 60 * 1000 } // 2 minutes
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    GOOGLE_AUTHENTICATION && app.use(GoogleAuthRouter)
    PASSPORT_LOCAL_AUTHENTICATION && app.use(AuthenticationRouter)
    app.use(LocalAuthRouter)
}

if (process.env.NODE_ENV === CONSTANTS.TESTPACKAGE) {
    authenticateServ(app)
    app.listen(PORT, () => {
        console.info("[%s] Login Node Service started listening to the port [%d]", process.env.NODE_ENV, PORT)
    })
}

export default app;