import {z, ZodTypeAny} from 'zod'
import { buildJsonSchemas, JsonSchema } from 'fastify-zod'

function withCustomId<T extends ZodTypeAny>(schema: T, id: string) {
    return schema.transform((originalSchema) => {
        if ('$id' in originalSchema) {
            return originalSchema;
        }
        return { ...originalSchema, $id: id };
    });
}

const productInput = {
    title: z.string(),
    price: z.number(), 
    content: z.string().optional(),  
}
const productGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
}

const productCreateSchema =  z.object({
    ...productInput
})

const prod =  withCustomId( productCreateSchema, "prod")

const productResponseSchema = z.object({
    ...productInput,
    ...productGenerated
})
const productsResponseSchema = z.array(productResponseSchema)

export type productCreateInput = z.infer<typeof productCreateSchema>;

export const productModels = {
    productCreateSchema,
    productResponseSchema,
    productsResponseSchema
}
export const {schemas: productSchemas, $ref: productRef} = buildJsonSchemas(productModels, {$id: "productSchema"})

