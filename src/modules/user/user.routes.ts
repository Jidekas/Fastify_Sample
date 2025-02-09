import { FastifyInstance } from "fastify"
import { getUsersHandler, loginHandler, registerUserHandler } from "./user.controller"
import { userRef } from "./user.schema"

const userRoutes = async (server: FastifyInstance)=>{

    server.post('/register', {
        schema: {
            body: userRef("createUserSchema"),
            response: {
                201: userRef('createUserResponseSchema')
            }
        }
    }, registerUserHandler)

    server.post('/login', {
        schema: {
            body: userRef('loginSchema'),
            response: {
                200: userRef('loginResponseSchema')
            }
        }
    }, loginHandler)

    server.get('/', {
        preHandler: [server.auth]
    }, getUsersHandler)
}

export default userRoutes