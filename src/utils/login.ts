// import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import bcrypt from 'bcrypt';

// interface LoginUserRequest extends FastifyRequest {
//   body: {
//     email: string;
//     password: string;
//   };
// }

// const loginUser = async (server: FastifyInstance) => {
//   server.post('/login', async (request: LoginUserRequest, reply: FastifyReply) => {
//     const { email, password } = request.body;

//     try {
//       // Find user by email
//       const user = await server.prisma.user.findUnique({
//         where: { email },
//       });

//       if (!user) {
//         return reply.code(400).send({ error: 'Invalid email or password.' });
//       }

//       // Compare the password
//       const isValidPassword = await bcrypt.compare(password, user.password);

//       if (!isValidPassword) {
//         return reply.code(400).send({ error: 'Invalid email or password.' });
//       }

//       // Send user data (excluding the password)
//       const { password: _, ...userWithoutPassword } = user;
//       reply.send(userWithoutPassword);
//     } catch (error) {
//       reply.code(500).send({ error: 'Login failed.' });
//     }
//   });
// };

// export default loginUser;
