import { Express } from "express";

const alphaNumericString = (length: Number) => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal; 
}

const checkAuthentication = (req : Express.Request, res: any, next: Function) => {
    if(req.isAuthenticated()) { return next()}
    res.redirect('/home')
}

export default  {
    alphaNumericString,
    checkAuthentication
}