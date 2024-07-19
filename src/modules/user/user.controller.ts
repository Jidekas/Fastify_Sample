import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, getAllUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";


export const registerUserHandler = async(request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply) => {
    const body = request.body;
    try {
        const user = await createUser(body)
        console.log({USER: user})

        return reply.code(201).send(user)
    } catch (e) {
        console.error(e)
        return reply.code(500).send(e)
    }

}

export const loginHandler = async(request: FastifyRequest<{Body: LoginInput}>, reply: FastifyReply)=>{
    const {email, password} = request.body

    //find user by email
    const user = await findUserByEmail(email)
    if(!user){
        return reply.code(401).send({
            message:"invalid email or password"
        })
    }
  //verify password
    const correctPass = verifyPassword({
        loginPassword: password,
        salt: user.salt,
        hash: user.password
    })
    //generate access token
    if(correctPass){
        const {password, salt, ...rest} = user
        //respond with access token
        return {accessToken: server.jwt.sign(rest)}
    } else {
        return reply.code(401).send({
            message:"invalid email or password"
        })
    }
}

export const getUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {        
        const users = await getAllUsers()
        return reply.code(200).send({
            message: "users retrieved succesfully",
            data: users
        })
    } catch (e) {
        console.error(e)
        return reply.code(500).send("something went wrong")
    }
}