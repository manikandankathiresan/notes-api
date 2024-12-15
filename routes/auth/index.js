
const authRoutes = (fastify, options, done) => {

    // All routes placed here
    const authControllers = require('../../controllers/auth')(fastify)


    fastify.post('/register', authControllers.registerUser)

    fastify.post('/login', authControllers.login)

    fastify.post('/rf-token', authControllers.refreshToken)

    // fastify.post('/logout', logout)

    done();

}

module.exports = authRoutes;