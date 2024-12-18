require('dotenv').config();  // Load environment variables from .env file

const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGOURI;  // Make sure the .env file has the MONGOURI variable set

const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Enables the new unified topology engine (recommended)
        });

        if (conn.connection.host) {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }

        // Listen to connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB connection lost.');
        });

        mongoose.connection.on('close', () => {
            console.log('MongoDB connection closed.');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected.');
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure if connection fails
    }
};

// Call the connectDB function to establish the connection
connectDB();

module.exports = connectDB;
