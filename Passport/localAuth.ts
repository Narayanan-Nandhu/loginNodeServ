import {PassportStatic} from "passport";
import LocalAuthentication from 'passport-local'
import { User } from '../model'
import utils from "../utils";

type user = {
    id: Number
    name: String,
    password: string
}

function validatePassword(user: user, password: String) {
    let decryptedData =  utils.decrypt(user.password)
    return decryptedData === password
}

const localAuthenticationPassportServ = (Passport: PassportStatic) => {

    Passport.serializeUser((user: any, done) => {
        done(null, user.id);
    })
    
    Passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (err) {
            done(null);
        }
    })

    Passport.use(new LocalAuthentication.Strategy({usernameField: "name", passwordField: 'password'}, async function (username, password, done) {
        try {
            const [ user ] = await User.find({name: username});

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const validUser = validatePassword(user, password);
            if (!validUser) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            if (validUser) {
                return done(null, user);
            }
        } catch (error) {
            console.error("Hey buddy, we got a error");
            return done(error);
        }
    }))
}

export default localAuthenticationPassportServ;