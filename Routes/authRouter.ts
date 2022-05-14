
import express from 'express';
import passport from 'passport';

const AuthenticationRouter = express.Router();

AuthenticationRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

AuthenticationRouter.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/success')
})

AuthenticationRouter.get('/api/current_user', (req, res) => {
    console.log('hello...', req.user);
    res.send(req?.user)
});

AuthenticationRouter.get('/api/logout', (req, res) => {
    console.log("Logout CAll ", Object.keys(req)) 
    req.logOut();
    res.redirect('/home')
})

export default AuthenticationRouter;