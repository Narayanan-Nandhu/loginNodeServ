import express, { Application } from "express";
import mongoose from "mongoose";
import passport from "passport";
import googleAuthenticationService from './Passport/googleAuth';
import AuthenticationRouter from './Routes/authRouter';
import cookieSession from 'cookie-session';
import Utils from './Utils/index'
import bodyParser from "body-parser";

require('dotenv').config();


let randomKey = Utils.alphaNumericString(13);


const authenticateServ = (app : Application) => {

    mongoose.connect('mongodb://localhost:27017/User').then(() => {
        console.log('Connected to Mongo DB');
    }).catch((error) => {
        console.log("Oh no connection error");
        console.log(error);
    })

    app.use(bodyParser.json())
    app.use(cookieSession({
        keys: [randomKey],
        maxAge: 60 * 1000
    }))

    app.use(passport.initialize());
    app.use(passport.session())
    googleAuthenticationService();

    app.use('/auth', AuthenticationRouter);

}


export default authenticateServ;