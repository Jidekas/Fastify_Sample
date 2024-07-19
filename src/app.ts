import buildServer from "./server";
import Fastify, { FastifyInstance,FastifyReply, FastifyRequest } from "fastify";

const server:FastifyInstance =  buildServer()

async function main(){


    try {
        await server.listen({port:3000, host:"0.0.0.0"});
        console.log("server listening on port 3000")
        
    } catch (e) {
        console.error(e);
        process.exit(1)   
    }
}

main();