import { FastifyInstance } from "fastify";
import { createProductHandler, getProductHandler } from "./product.controller";
import { productRef } from "./product.schema";

const productRoutes = async (server: FastifyInstance) => {
    server.post('/', 
    {
        preHandler: [server.auth],
        schema: {
            body: productRef('productCreateSchema'),
            response: {
                201: productRef('productResponseSchema')
            }
        }
    }, 
    createProductHandler),

    server.get('/', 
    {
        preHandler: [server.auth],
        schema: {
            response: {
                200: productRef('productsResponseSchema')
            }
        }

    }, getProductHandler)
}

export default productRoutes