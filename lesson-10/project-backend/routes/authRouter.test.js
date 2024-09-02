import request from "supertest";

import {initDBConnection, closeDBConnection} from "../initDBConnection.js";
import startServer from "../server.js";

import { findUser, deleteAllUser } from "../services/authServices.js";

describe("test /api/auth/signup", ()=> {
    let server = null;

    beforeAll(async ()=> {
        await initDBConnection(process.env.DB_HOST_TEST);
        server = startServer();
    })

    afterAll(async()=> {
        await closeDBConnection();
        server.close();
    });

    beforeEach(async()=> {});

    afterEach(async()=> await deleteAllUser());

    test("test signup with correct data", async()=> {
        const signupData = {
            username: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const {statusCode, body} = await request(server).post("/api/auth/signup").send(signupData);

        expect(statusCode).toBe(201);
        expect(body.username).toBe(signupData.username);
        expect(body.email).toBe(signupData.email);

        const user = await findUser({email: signupData.email});
        expect(user).toBeTruthy();
        if(user) {
            expect(user.username).toBe(signupData.username);
            expect(user.email).toBe(signupData.email);
        }
    })
})