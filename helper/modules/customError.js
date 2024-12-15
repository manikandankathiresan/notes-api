// customErrorPlugin.js

async function customErrorPlugin(fastify, options) {
    fastify.setErrorHandler(async (error, request, reply) => {
        // Log the error
        console.error(error);

        // Your custom error handling logic goes here
        // You can modify the response based on the error type or code
        // For now, let's send a generic error response
        reply.code(500).send({ status: false, error: 'Internal Server Error' });
    });
}

module.exports = customErrorPlugin;
