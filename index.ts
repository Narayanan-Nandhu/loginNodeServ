import express from "express";
import Routes from './Routes'
import mongoose from "mongoose";
import passport from "passport";
import googleAuthenticationService from './Passport/googleAuth';
import AuthenticationRouter from './Routes/authRouter';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser'
import Utils from './Utils/index'
import bodyParser from "body-parser";

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;
const AuthRouter = express.Router();

let randomKey = Utils.alphaNumericString(13);


app.use(bodyParser.json())
app.use(cookieSession({
    keys: [randomKey],
    maxAge: 60 * 1000
}))

app.use(passport.initialize());
app.use(passport.session())




mongoose.connect('mongodb://localhost:27017/User').then(() => {
    console.log('Connected to Mongo DB');
}).catch((error) => {
    console.log("Oh no connection error");
    console.log(error);
})

googleAuthenticationService();

app.use('/auth', AuthenticationRouter)
app.use('/api', Routes)

AuthRouter.get('/auth', AuthenticationRouter)


app.listen(PORT, ()=> {
    console.log('Service started listening to the port',PORT);
});



export default AuthRouter;

