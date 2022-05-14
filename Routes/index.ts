import express from 'express';
import Utils from '../Utils';
const apiRouter = express.Router();

    apiRouter.get('/v1', Utils.checkAuthentication, (req, res) => {
        console.log("Hello World...")
        res.send('Hello from v1 from ')
    });

export default apiRouter;