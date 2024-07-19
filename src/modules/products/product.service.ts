import prisma from "../../utils/prisma";
import { productCreateInput } from "./product.schema";


export const  createProduct = async(data: productCreateInput & {ownerId: number}) => {
    return prisma.product.create({data})
}

export const getProducts = async () => {
    return prisma.product.findMany({
        select: {
            title: true,
            content: true,
            price: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            owner: {
                select:{
                    name: true,
                    id: true
                }
            }
        }
    })
}