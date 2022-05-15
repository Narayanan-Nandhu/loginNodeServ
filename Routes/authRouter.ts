
import express from 'express';
import passport from 'passport';

const AuthenticationRouter = express.Router();

AuthenticationRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

AuthenticationRouter.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/success')
})

AuthenticationRouter.get('/api/current_user', (req, res) => {
    if(req?.user) {
       res.send(req?.user);
    } else {
        res.sendStatus(200).redirect('/failure')
    }
});

AuthenticationRouter.get('/api/logout', (req, res) => {
    req.logOut();
    res.redirect('/home')
})

export default AuthenticationRouter;