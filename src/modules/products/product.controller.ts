import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { productCreateInput } from "./product.schema";

export const createProductHandler = async (request: FastifyRequest<{Body: productCreateInput}>, reply: FastifyReply)=> {
    const product = await createProduct({...request.body, ownerId: request.user.id})
    return product
}

export const getProductHandler = async (request: FastifyRequest, reply:FastifyReply) => {
    const products = await getProducts();
    return products
} 