import Fastify, { FastifyInstance,FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/products/product.schema";
import fjwt from '@fastify/jwt';
import productRoutes from "./modules/products/product.routes";
import { productRef } from "./modules/products/product.schema";
import type { FastifyZod } from "fastify-zod";
import { productModels } from "./modules/products/product.schema";
import { withRefResolver } from "fastify-zod";
import { JWT } from "@fastify/jwt";


declare module "fastify" {
    interface FastifyRequest{
        jwt: JWT
    }
    export interface FastifyInstance {
        auth: any
    }
}

declare module "@fastify/jwt"{
    interface FastifyJWT {
        user: {
        email: string,
        name: string,
        id: number
    }
}
}

declare module "fastify" {
interface FastifyInstance {
    readonly zod: FastifyZod<typeof productModels>;
}
}


const buildServer =  ()=>{

    const server: FastifyInstance = Fastify();
    


server.register(fjwt, {
    secret: 'fsdhgghdshghjsgjhsfugdchgbjbdgffahffadhshjg'
})

server.decorate('auth', async (request: FastifyRequest, reply:FastifyReply)=>{
    try {
        await request.jwtVerify();
        // console.log(request)
    } catch (e) {
        reply.send(e)
    }
})



server.get('/healthcheck', async () => {
    return {status: "ok"}
})

server.addHook('preHandler', (req, reply, next)=>{
    req.jwt = server.jwt
    return next()
})

for(const schema of [...userSchemas, ...productSchemas]){
    server.addSchema(schema);
}

// server.register(require("@fastify/swagger"));
// server.register(require("@fastify/swagger-ui"), {
//     routePrefix: "/docs",
//     uiConfig: {
//         docExpansion: "",
//     },
//     theme: {
//         title: "FastifyClass::Jide's Docs",
//     },
// });

server.get("/", async () => {
    return { gwayva_says: "hello haustidy", docs: `http://127.0.0.1:3000/docs/static/index.html` };
});





server.register(userRoutes, {prefix: "api/users"})
server.register(productRoutes, {prefix: "api/products"})


return server

}

export default buildServer