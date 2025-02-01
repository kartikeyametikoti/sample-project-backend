
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const producerRouter = require("./routes/producer");

const app = express();
const buildVersion = process.env.BUILD_VERSION || 'development';
const PORT = process.env.PORT || 5000;

// MongoDB Atlas configuration
const MONGO_URL = process.env.MONGO_URL;

// Initialize middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'IMDB API Server Running',
        version: buildVersion,
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    
    res.status(isDbConnected ? 200 : 503).json({ 
        status: isDbConnected ? 'healthy' : 'unhealthy',
        version: buildVersion,
        timestamp: new Date().toISOString(),
        database: {
            connected: isDbConnected,
            state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
        }
    });
});

// API Routes
app.use("/api/movies", movieRouter);
app.use("/api/actors", actorRouter);
app.use("/api/producers", producerRouter);

// MongoDB Connection Configuration
const connectDB = async (retries = 5) => {
    console.log("Starting IMDB API Server - Version:", buildVersion);
    
    while (retries) {
        try {
            console.log("Attempting to connect to MongoDB Atlas...");
            
            await mongoose.connect(MONGO_URL, {
                retryWrites: true,
                w: 'majority',
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000
            });
            
            console.log("✅ MongoDB Atlas connected successfully");
            return true;
        } catch (err) {
            console.error("❌ MongoDB connection error:", err.message);
            retries -= 1;
            
            if (retries === 0) {
                console.error("❌ Max retries reached. Exiting...");
                process.exit(1);
            }
            
            console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    return false;
};

// Mongoose event handlers
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        version: buildVersion
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method,
        version: buildVersion
    });
});

// Graceful shutdown handler
const gracefulShutdown = async () => {
    try {
        console.log('🔄 Initiating graceful shutdown...');
        
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('📝 MongoDB connection closed');
        }
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during graceful shutdown:', err);
        process.exit(1);
    }
};

// Server initialization
const startServer = async () => {
    try {
        const isConnected = await connectDB();
        
        if (!isConnected) {
            console.error("❌ Failed to connect to MongoDB. Server will not start.");
            process.exit(1);
        }
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📦 Version: ${buildVersion}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
        });

        server.on('error', (err) => {
            console.error('Server error:', err);
            process.exit(1);
        });

    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
};

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

// Shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
startServer();

module.exports = app;
