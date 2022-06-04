import { PassportStatic } from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { User } from "../Model";

const googleAuthenticationService = (passport: PassportStatic) => {

    passport.serializeUser((user: any, done) => {
        console.log('User...> Serialize USer', user)
        done(null, user.id);
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

    console.info("Client ID", process.env['GOOGLE_CLIENT_ID'])
    console.info("CLIENT SECRET", process.env['GOOGLE_CLIENT_SECRET'])
    console.info("PORT", process.env.PORT)

    passport.use(new GoogleStrategy.Strategy({
        clientID: process.env['GOOGLE_CLIENT_ID'] || '',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
        callbackURL: `/oauth2/redirect/google`
    }, async (accessToken, refreshToken, profile: any, done) => {

        console.log("AccessToken", refreshToken, profile, accessToken)
        console.log("AccessToken", profile.id, '====>')
        try {
            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) {
                done(null, existingUser)
            } else {
                let profilePic = profile?.photos[0]?.value || '';
                const newUser = await new User(
                    {
                        googleId: profile.id,
                        name: profile.name.givenName,
                        profileImage: profilePic
                    }).save()
                done(null, newUser)
            }
        } catch (err: any) {
            console.warn("Hey we got a error at Passport : Google Auth Strategy");
            return done(err);
        }
    }))
}

export default googleAuthenticationService;