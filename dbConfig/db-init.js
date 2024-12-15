const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// MongoDB connection URI (Replace with your actual MongoDB Atlas URI)
const mongoURI = 'mongodb+srv://Mkprofile98:hrtRdUQ88BJTt9G1@nodejs.co6ty.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS';

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
