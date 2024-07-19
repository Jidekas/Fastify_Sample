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







export const server: FastifyInstance = Fastify();

declare module "fastify" {
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

async function main(){

    for(const schema of [...userSchemas, ...productSchemas]){
        server.addSchema(schema);
    }

    await server.register(require("@fastify/swagger"));
    await server.register(require("@fastify/swagger-ui"), {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "",
        },
        theme: {
            title: "FastifyClass::Jide's Docs",
        },
    });

    server.get("/", async () => {
        return { gwayva_says: "hello haustidy", docs: `http://127.0.0.1:3000/docs/static/index.html` };
    });





    server.register(userRoutes, {prefix: "api/users"})
    server.register(productRoutes, {prefix: "api/products"})

    try {
        await server.listen({port:3000, host:"0.0.0.0"});
        console.log("server listening on port 3000")
        
    } catch (e) {
        console.error(e);
        process.exit(1)   
    }
}

main();