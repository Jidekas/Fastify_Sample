// import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// // Define the schema for user creation
// const createUserSchema = {
//     type: 'object',
//     required: ['firstName', 'lastName', 'email', 'password'],
//     properties: {
//         firstName: { type: 'string' },
//         lastName: { type: 'string' },
//         email: { type: 'string', format: 'email' },
//         password: { type: 'string', minLength: 8 }
//     }
// };

// // Define the schema for user login
// const loginUserSchema = {
//     type: 'object',
//     required: ['email', 'password'],
//     properties: {
//         email: { type: 'string', format: 'email' },
//         password: { type: 'string', minLength: 8 }
//     }
// };

// async function userRoutes(server: FastifyInstance) {
//     // Create User Route
//     server.post<{ Body: { firstName: string, lastName: string, email: string, password: string } }>('/register', { schema: { body: createUserSchema } }, async (request, reply) => {
//         const { firstName, lastName, email, password } = request.body;
        
//         // Check if user already exists
//         const existingUser = await server.prisma.user.findUnique({ where: { email } });
//         if (existingUser) {
//             return reply.status(400).send({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user in the database
//         const user = await server.prisma.user.create({
//             data: {
//                 firstName,
//                 lastName,
//                 email,
//                 password: hashedPassword,
//             }
//         });

//         return reply.status(201).send({ message: 'User created successfully', user });
//     });

//     // Login User Route
//     server.post<{ Body: { email: string, password: string } }>('/login', { schema: { body: loginUserSchema } }, async (request, reply) => {
//         const { email, password } = request.body;

//         // Find user by email
//         const user = await server.prisma.user.findUnique({ where: { email } });
//         if (!user) {
//             return reply.status(400).send({ message: 'Invalid email or password' });
//         }

//         // Verify password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return reply.status(400).send({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

//         return reply.status(200).send({ message: 'Login successful', token });
//     });
// }

// export default userRoutes;
