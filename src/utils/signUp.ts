// import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import bcrypt from 'bcrypt';

// interface CreateUserRequest extends FastifyRequest {
//   body: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//   };
// }

// const registerUser = async (server: FastifyInstance) => {
//   server.post('/register', async (request: CreateUserRequest, reply: FastifyReply) => {
//     const { firstName, lastName, email, password } = request.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//       // Create user in the database
//       const user = await server.prisma.user.create({
//         data: {
//           firstName,
//           lastName,
//           email,
//           password: hashedPassword,
//         },
//       });

//       reply.code(201).send(user);
//     } catch (error) {
//       reply.code(400).send({ error: 'User could not be created.' });
//     }
//   });
// };

// export default registerUser;
