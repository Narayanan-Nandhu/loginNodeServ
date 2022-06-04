
import express, { Response, Request } from 'express';
import Passport from 'passport';
import { User } from "../Model";
import utils from '../utils';
export const AuthenticationRouter = express.Router();
export const GoogleAuthRouter = express.Router();
export const LocalAuthRouter = express.Router();


GoogleAuthRouter.get('/auth/google', Passport.authenticate('google', { scope: ['email', 'profile'] }))

GoogleAuthRouter.get('/oauth2/redirect/google',
    Passport.authenticate('google', { failureRedirect: '/' }),
    (req: Express.Request, res: Response) => {
        console.log("oauth redirection..")
        res.redirect('gauth/success')
    }
);

LocalAuthRouter.post('/local/auth/signup', async (req: any, res: any) => {
    try {
        const encPass = utils.encrypt(req.body.password);
        if(await User.findOne({ name: req.body.name })) {
            return res.status(400).send({message: "User name already exists in the System"});
        }
        const user = await User.create({ name: req.body.name, password:  encPass });
        console.log("User value Inserted", user);
        res.redirect(200, '/lauth/success');
    } catch (error) {
        console.log("User Insertion Error", error);
        res.redirect(500, '/lauth/failure');
    }
})

LocalAuthRouter.get('/localauth/failed', (req : Request, res: Response) => {
    return res.status(400).send({message: "Username or Password is not correct. Please enter correct credentials"});
}) 

LocalAuthRouter.post('/local/auth/signin', Passport.authenticate('local', { failureRedirect: '/localauth/failed', failureMessage: 'Invalid User Credentials' }),
    (req: any, res: any) => {
        console.log("STatusCode", res.statusCode);
        console.log("STatusCode", res.body);

        console.log("Entered signIn post call - Req Authenticated", req.isAuthenticated())
        res.status(200).send(req.user)
});


AuthenticationRouter.get('/api/current_user', (req, res) => {
    if (req?.user) {
        res.status(200).json(req?.user);
    } else {
        res.status(302).redirect('/home')
    }
});

AuthenticationRouter.post('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

