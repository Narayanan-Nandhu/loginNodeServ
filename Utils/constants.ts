
const CONSTANTS = Object.freeze({
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TESTPACKAGE: "test",
    CRYPTO_ALGORITHM: "aes-256-cbc",
    PRODUCTION_USER: "USERS",
    TESTPACKAGE_USER: "USERS_TEST",
    DEFAULT_APP_CONFIG: {
        PASSPORT_LOCAL_AUTHENTICATION: true,
        GOOGLE_AUTHENTICATION: true,
        MONGO_DB_NAME: "USERS",
        SESSIONOUT_TIMING:  2 * 60 * 1000,
        ROUTES_ENDPOINTS: {
            PASSPORT_LOCAL: {
                SIGN_UP: '/local/auth/signup',
                SIGN_IN: '/local/auth/signin',
                SIGN_IN_FAILED: '/local/auth/failed',
                SIGN_UP_SUCCESS: '/local/auth/success',
                SIGN_UP_FAILED: '/local/auth/failed',
                LOGOUT: '/api/localauth/logout',
                GET_USER: '/api/localauth/current_user',
                LOGOUT_REDIRECT_URI: '/home'
            },
            GOOGLE_AUTH: {
                SIGNUP_URI: '/auth/google',
                CALLBACK_URI: '/oauth2/redirect/google',
                GAUTH_SUCCESS: 'gauth/success',
                LOGOUT: '/api/gauth/logout',
                GET_USER: '/api/gauth/current_user',
                LOGOUT_REDIRECT_URI: '/home'
            }
        }
    }
})

export default CONSTANTS;