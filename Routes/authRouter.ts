
import express, { Request, Application } from 'express';
import Passport from 'passport';
import { User } from "../model";
import utils from '../utils';
export const AuthenticationRouter = express.Router();
export const GoogleAuthRouter = express.Router();
export const LocalAuthRouter = express.Router();


export const initializeRoutes = (app: any) => {

    const { ROUTES_ENDPOINTS } = app.get('APP_CONFIG')


    GoogleAuthRouter.get(ROUTES_ENDPOINTS.GOOGLE_AUTH.SIGNUP_URI, Passport.authenticate('google', { scope: ['email', 'profile'] }))

    GoogleAuthRouter.get(ROUTES_ENDPOINTS.GOOGLE_AUTH.CALLBACK_URI,
        Passport.authenticate('google', { failureRedirect: ROUTES_ENDPOINTS.GOOGLE_AUTH.LOGOUT_REDIRECT_URI, successRedirect: ROUTES_ENDPOINTS.GOOGLE_AUTH.GAUTH_SUCCESS }),
        (req: Express.Request, res: any) => {
            console.trace("oauth redirection...")
            res.redirect(ROUTES_ENDPOINTS.GOOGLE_AUTH.GAUTH_SUCCESS)
        }
    );

    GoogleAuthRouter.get(ROUTES_ENDPOINTS.GOOGLE_AUTH.LOGOUT, (req:any, res:any, next) => {
        req.logout(function (err: any) {
            if (err) { return next(err); }
            res.redirect(ROUTES_ENDPOINTS.GOOGLE_AUTH.LOGOUT_REDIRECT_URI);
        });    
    });

    LocalAuthRouter.post(ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_UP, async (req: any, res: any) => {
        try {
            const encPass = await utils.encrypt(req.body.password);
            const [user] = await User.find({ name: req.body.name });
            if (user) {
                return res.status(400).send({ message: "User name already exists in the System" });
            }
            await User.create({ name: req.body.name, password: encPass });
            res.redirect(200, ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_UP_SUCCESS);
        } catch (error) {
            res.redirect(500, ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_UP_FAILED);
        }
    })

    LocalAuthRouter.get(ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_UP_FAILED || ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_IN_FAILED, (req: Request, res: any) => {
        return res.status(400).send({ message: "Username or Password is not correct. Please enter correct credentials" });
    })

    LocalAuthRouter.post(ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_IN, Passport.authenticate('local', { failureRedirect: ROUTES_ENDPOINTS.PASSPORT_LOCAL.SIGN_IN_FAILED, failureMessage: 'Invalid User Credentials' }),
        (req: any, res: any) => {
            res.status(200).send(req.user)
        });

    AuthenticationRouter.get(ROUTES_ENDPOINTS.PASSPORT_LOCAL.GET_USER || ROUTES_ENDPOINTS.GOOGLE_AUTH.GET_USER, (req, res: any) => {
        if (req?.user) {
            res.status(200).json(req?.user);
        } else {
            res.status(302).redirect(ROUTES_ENDPOINTS.PASSPORT_LOCAL.LOGOUT_REDIRECT_URI)
        }
    });

    AuthenticationRouter.post(ROUTES_ENDPOINTS.PASSPORT_LOCAL.LOGOUT, (req: any, res: any, next) => {
        req.logout(function (err: any) {
            if (err) { return next(err); }
            res.redirect(ROUTES_ENDPOINTS.PASSPORT_LOCAL.LOGOUT_REDIRECT_URI);
        });
    })
}


