// const createError = require('http-errors')
const fastify = require("fastify")({ logger: true });
const path = require("path");
const AutoLoad = require("@fastify/autoload");
const customErrorPlugin = require("./helper/modules/customError");
const fastifyRedis = require('@fastify/redis');
const connectDb = require("./dbConfig/db-init");


const PORT = 5000;

fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: { prefix: "/api/v1" }
});

fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12
});

// Register the custom error handling plugin
fastify.register(customErrorPlugin);

fastify.register(require('fastify-cors'))

// fastify.register(require('@fastify/redis'), {
//     host: '127.0.0.1',
//     port: 6379,
//     password: 'password',
// });

fastify.get('/', (req, reply) => {
    reply.send('Server Running Smoothly...')
})


// Registering the auth middleware plugin

const initApp = async () => {
    try {
        fastify.listen({
            port: 5000,           
            host: '0.0.0.0',      // Listen on all available network interfaces (necessary for Docker)
            logger: true          
        }, (err, address) => {
            if (err) {
                console.error(err);  
                process.exit(1);
            }
            console.log(`Server listening at ${address}`); 
        });

        // connectDB();  

    } catch (error) {
        console.log('Error during app initialization:', error);
    }
}

initApp();

