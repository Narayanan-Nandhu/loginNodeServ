import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import User from "../Model/User";


passport.serializeUser((User: any, done) => {
    console.log('User...> Serialize USer', User)
    done(null, User.id);
})

passport.deserializeUser(async (id, done) => {

    try {
        const user = await User.findById(id);
        console.log("User...> DeserializeUser", user);
        done(null, user)
    } catch (err) {
        done(null);
    }
})

const googleAuthenticationService = () => {
console.log("Client ID", process.env['GOOGLE_CLIENT_ID'])
console.log("CLIENT SECRET", process.env['GOOGLE_CLIENT_SECRET'])

    passport.use(new GoogleStrategy.Strategy({
        clientID: process.env['GOOGLE_CLIENT_ID'] || '',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
        callbackURL: "/auth/oauth2/redirect/google"
    }, async (accessToken, refreshToken, profile: any, done) => {

        console.log("AccessToken", refreshToken, profile, accessToken)
        console.log("AccessToken", profile.id, '====>')

        try {
            const existingUser = await User.findOne({googleId: profile.id})
            console.log('Exisitng User...', existingUser);  
            if (existingUser) {
                console.log('Exisitng User...', existingUser);  
                done(null, existingUser)
            } else {
                let profilePic = profile?.photos[0]?.value || '';
                await new User(
                    {
                        googleId: profile.id,
                        name: profile.name.givenName,
                        profilePic
                    }).save()
                done(null, User)
            }
        } catch (err: any) {
            console.log("Hey we got a error at Passport : Google Auth Strategy");
            return done(err);
        }
    }))
}

export default googleAuthenticationService;