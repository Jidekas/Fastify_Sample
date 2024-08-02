import {faker} from "@faker-js/faker"
import buildServer from "../../../server"
import { afterAll } from 'vitest'
import {ImportMock} from 'ts-mock-imports'
import * as userService from '../user.service'
// import prisma from "../../../utils/prisma"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


describe('createUser test suite', ()=>{

    test.skip('POST /api/user | create user successfully with mock createUser', async()=>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const id = Math.floor(Math.random() * 1_000)

        const fastify = buildServer()

        
        const stub = ImportMock.mockFunction(userService, 'createUser',{
            name,
            email,
        })
        
        afterAll(()=>{
            fastify.close()
            stub.restore()
        })


        const response = await fastify.inject({
            method:'POST',
            url:'http://localhost:3000/api/users/register',
            payload:{
                name,
                email,
                password
            }
        })

        
        const json = response.json()
        console.log({Debug:json, test:id})
        
        expect(response.statusCode).toBe(201)
        expect(json.name).toBe(name)
        expect(json.email).toBe(email)
        expect(typeof json.id).toBe('number')
    })



    test.only('POST /api/user | create user successfully with test dataBase', async()=>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const id = Math.floor(Math.random() * 1_000)

        const fastify = buildServer()

        
        
        afterAll(()=>{
            fastify.close()
            // await prisma.user.deleteMany({})
        })


        const response = await fastify.inject({
            method:'POST',
            url:'http://localhost:3000/api/users/register',
            payload:{
                name,
                email,
                password
            }
        })

        
        const json = response.json()
        console.log({Debug:json, test:id})
        
        expect(response.statusCode).toBe(201)
        expect(json.name).toBe(name)
        expect(json.email).toBe(email)
        expect(typeof json.id).toBe('number')

    })

    test.skip('POST /api/user | fail to create a user', ()=>{

    })
})