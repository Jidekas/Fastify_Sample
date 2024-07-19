import { type } from 'os'
import {z} from 'zod'
import {buildJsonSchemas} from 'fastify-zod'


const userCore = {
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string"
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "password is required",
    })
})

const createUserResponseSchema = z.object({
    id: z.number(),
 ...userCore
})

const loginSchema = z.object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string"
    }).email(),
    password: z.string({
        required_error: "password is required",
    })
})

const loginResponseSchema = z.object({
    accessToken: z.string()
})
export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

const userModel = {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
}

export const {schemas: userSchemas, $ref: userRef} = buildJsonSchemas(userModel, {$id: "userShemas"})