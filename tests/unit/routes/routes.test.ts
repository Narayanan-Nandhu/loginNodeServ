import { authenticateServ } from '../../../index'
import express, { Response } from 'express';
import chai from 'chai'
import utils from "../../../utils";
import Request from 'supertest';
import { User } from '../../../Model';
import mongoose from "mongoose";


const app = express();

describe('Should test the Authentication Routes', () => {

    beforeAll(async () => {
        await authenticateServ(app);
        await User.collection.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect()
    })

   describe('Testing the Passport local authentication routes', () => {
        const testUser = {
            "name": "abc@gmail.com",
            "password": "123!"
        }

        it('should create the new user', async () => {
            const { body, status, redirect } = await Request(app).post('/local/auth/signup').send(testUser)
            expect(status).toBe(200);
            expect(body).not.toBe(null);
        })

        it('should throw error for existing user signup', async () => {
            const { body, status } = await Request(app).post('/local/auth/signup').send(testUser);
            expect(status).toBe(400);
            expect(body).toStrictEqual({ message: 'User name already exists in the System' })
        })

        it('should throw error for Passport local authenticate', async () => {
            const { body, status } = await Request(app).post('/local/auth/signup');
            expect(status).toBe(500);
            expect(body).toStrictEqual({})
        })

        
        it('should throw error for logging the non-existing user', async () => {
            let invalidUserCredentials = {
                "name": "xyz@gmail.com",
                "password": "123!"
            } 
            const res = await Request(app).post('/local/auth/signin').send(invalidUserCredentials);
            expect(res.status).toBe(302);
            const { body, statusCode } = await Request(app).get('/localauth/failed');
            expect(statusCode).toBe(400);
            expect(body).toStrictEqual({
                "message": "Username or Password is not correct. Please enter correct credentials"
            })
        })

        it('should throw error for logging the existing user with incorrect password', async () => {
            let invalidPasswordUser = {
                "name": "abc@gmail.com",
                "password": "wrongpassword"
            } 
            const res = await Request(app).post('/local/auth/signin').send(invalidPasswordUser);
            expect(res.status).toBe(302);
            const { body, statusCode } = await Request(app).get('/localauth/failed');
            expect(statusCode).toBe(400);
            expect(body).toStrictEqual({
                "message": "Username or Password is not correct. Please enter correct credentials"
            })
        })

        it('should login the user with correct credentials', async () => {
            var { body, status } = await Request(app).post('/local/auth/signin').send(testUser);
            console.log("user...", body)
            expect(body.name).toStrictEqual(testUser.name);
            expect(status).toBe(200);
            expect(utils.decrypt(body.password)).toStrictEqual(testUser.password)

        })

        it('should logout the user successfully', async () => {
            const { body, status } = await Request(app).post('/api/logout');
            console.log("bodu.. error ", body, status);
            expect(body).toStrictEqual({});
            expect(status).toBe(302);
        })
    })
})