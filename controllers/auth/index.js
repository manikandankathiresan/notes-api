const Users = require('../../models/auth')
const { authSchema } = require('../../helper/modules/validation-schema')

const fastifyBcrypt = require('fastify-bcrypt');
const { signAccessToken } = require('../../helper/modules/jwt-helper');
const { MESSAGE } = require('../../utils/constants');

const authController = (fastify) => {

    const getUserInfo = async(req, reply) => {
        
    }

    const registerUser = async (req, reply) => {
        console.log('comminggg')
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new Error('Bad Requerst');
            const isUserExist = await Users.findOne({ email: email }).lean();
            if (isUserExist) {
                const error = new Error('User Already Exist');
                error.statusCode = 409; // Set a custom status code for the error
                throw error;
            }
            const hashedPassword = await fastify.bcrypt.hash(password);
            const user = new Users({ email, password: hashedPassword });
            const savedUser = await user.save();
            reply.code(201).send({ message: MESSAGE.USER.USER_CREATED_SUCCESS });
        } catch (error) {
            throw error
        }
    }

    const login = async (req, reply) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new Error('Bad Request');

            const user = await Users.findOne({ email: email }).lean();
            if (!user) {
                const error = new Error('User Not found');
                error.statusCode = 404;
                throw error;
            }

            const isValidPassword = await fastify.bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                const error = new Error('Invalid email / password');
                error.statusCode = 401;
                throw error;
            }

            // Delete the password field from the user object
            delete user.password;

            const accessToken = await signAccessToken(user.email, user.id);
            // Send the response with user information without the password field
            reply.send({ message: MESSAGE.USER.USER_LOGIN_SUCCESS, data: { userInfo: user, accessToken: accessToken } });
        } catch (error) {
            throw error;
        }

    }

    const refreshToken = async (req, reply) => {
        console.log(a)
        // Perform Redis operation
        reply.send('Refresh Token')
    }

    const logout = async (req, reply) => {
        console.log(a)

        await fastify.redis.set(`refreshToken:${120}`, "121212121", 'EX', 86400);
        const storedRefreshToken = await fastify.redis.get(`refreshToken:${120}`);
        console.log(storedRefreshToken)


        reply.send('log out...')
    }
    return { registerUser, login, refreshToken, logout }
}

module.exports = authController;