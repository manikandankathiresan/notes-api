// authMiddleware.js

const fastify = require('fastify')
const jwt = require('jsonwebtoken');
const Users = require('../models/auth');
const fastifyPlugin = require("fastify-plugin");

async function verifyJWT(request, reply) {
    try {
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header is missing or malformed');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify the token
        const decoded = jwt.verify(token, '9c40adc41c20b4adc9e1c4ab52f5cf79408e59cd5e07e77d48adbbe8f9cc6d96');
        const user = await Users.findOne({ id: decoded.id });
        if (!user) {
            throw new Error('User not found');
        }

    } catch (error) {
        // If token verification fails or if there's any other error, return unauthorized
        reply.status(401).send({ error: error.name === 'JsonWebTokenError' ? error.message : 'Unauthorized' });
    }
}

// // Exporting Fastify plugin
// fastify.addHook('preHandler', (request, reply, done) => {
//     // Your hook logic here
//     done();
// });

