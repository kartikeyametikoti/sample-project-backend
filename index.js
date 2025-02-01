
// // // // // // // // const express = require("express");
// // // // // // // // const mongoose = require("mongoose");
// // // // // // // // require('dotenv').config();
// // // // // // // // const movieRouter = require("./routes/movie");
// // // // // // // // const actorRouter = require("./routes/actor");
// // // // // // // // const producerRouter = require("./routes/producer");
// // // // // // // // const cors = require("cors");

// // // // // // // // const app = express();

// // // // // // // // const buildVersion = process.env.BUILD_VERSION || 'development';
// // // // // // // // console.log(`Starting IMDB API Server - Version: ${buildVersion}`);

// // // // // // // // app.use(cors({
// // // // // // // //   origin: ['http://34.93.14.21:80','http://34.93.14.21:3000', 'http://localhost:3000'],
// // // // // // // //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // // // // // //   credentials: true
// // // // // // // // }));

// // // // // // // // app.use(express.json());

// // // // // // // // // Root endpoint
// // // // // // // // app.get('/', (req, res) => {
// // // // // // // //   res.status(200).json({ 
// // // // // // // //     message: 'IMDB API Server Running',
// // // // // // // //     version: buildVersion,
// // // // // // // //     timestamp: new Date().toISOString()
// // // // // // // //   });
// // // // // // // // });

// // // // // // // // // Health check endpoint - Keeping it under /api for consistency
// // // // // // // // app.get('/api/health', (req, res) => {
// // // // // // // //   res.status(200).json({ 
// // // // // // // //     status: 'healthy',
// // // // // // // //     version: buildVersion,
// // // // // // // //     timestamp: new Date().toISOString()
// // // // // // // //   });
// // // // // // // // });

// // // // // // // // // API Routes
// // // // // // // // app.use("/api/movies", movieRouter);
// // // // // // // // app.use("/api/actors", actorRouter);
// // // // // // // // app.use("/api/producers", producerRouter);

// // // // // // // // // MongoDB Connection URI
// // // // // // // // const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // // // // // const connectDB = async (retries = 5) => {
// // // // // // // //   while (retries) {
// // // // // // // //     try {
// // // // // // // //       await mongoose.connect(MONGO_URI, {
// // // // // // // //         serverSelectionTimeoutMS: 10000,
// // // // // // // //         connectTimeoutMS: 20000,
// // // // // // // //         useNewUrlParser: true,
// // // // // // // //         useUnifiedTopology: true
// // // // // // // //       });
// // // // // // // //       console.log("DB connected successfully");
// // // // // // // //       return true;
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("MongoDB connection error:", err.message);
// // // // // // // //       retries -= 1;
// // // // // // // //       if (retries === 0) {
// // // // // // // //         console.error("Max retries reached. Exiting...");
// // // // // // // //         return false;
// // // // // // // //       }
// // // // // // // //       console.log(`Retrying connection... (${retries} attempts remaining)`);
// // // // // // // //       await new Promise(resolve => setTimeout(resolve, 5000));
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   return false;
// // // // // // // // };

// // // // // // // // // Error handling middleware
// // // // // // // // app.use((err, req, res, next) => {
// // // // // // // //   console.error(err.stack);
// // // // // // // //   res.status(500).json({
// // // // // // // //     error: 'Something broke!',
// // // // // // // //     version: buildVersion
// // // // // // // //   });
// // // // // // // // });

// // // // // // // // // 404 handler
// // // // // // // // app.use((req, res) => {
// // // // // // // //   res.status(404).json({
// // // // // // // //     error: 'Route not found',
// // // // // // // //     version: buildVersion
// // // // // // // //   });
// // // // // // // // });

// // // // // // // // const PORT = process.env.PORT || 5000;

// // // // // // // // const startServer = async () => {
// // // // // // // //   try {
// // // // // // // //     const isConnected = await connectDB();
// // // // // // // //     if (!isConnected) {
// // // // // // // //       console.error("Failed to connect to MongoDB. Server will not start.");
// // // // // // // //       process.exit(1);
// // // // // // // //     }
    
// // // // // // // //     app.listen(PORT, '0.0.0.0', () => {
// // // // // // // //       console.log(`App is listening on port ${PORT}`);
// // // // // // // //       console.log(`Version: ${buildVersion}`);
// // // // // // // //       console.log(`Health check available at: http://localhost:${PORT}/api/health`);
// // // // // // // //     });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error('Failed to start server:', err);
// // // // // // // //     process.exit(1);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // process.on('uncaughtException', (err) => {
// // // // // // // //   console.error('Uncaught Exception:', err);
// // // // // // // //   process.exit(1);
// // // // // // // // });

// // // // // // // // process.on('unhandledRejection', (err) => {
// // // // // // // //   console.error('Unhandled Rejection:', err);
// // // // // // // //   process.exit(1);
// // // // // // // // });

// // // // // // // // startServer();
// // // // // // // const express = require("express");
// // // // // // // const mongoose = require("mongoose");
// // // // // // // require('dotenv').config();
// // // // // // // const movieRouter = require("./routes/movie");
// // // // // // // const actorRouter = require("./routes/actor");
// // // // // // // const producerRouter = require("./routes/producer");
// // // // // // // const cors = require("cors");
// // // // // // // const app = express();

// // // // // // // const buildVersion = process.env.BUILD_VERSION || 'development';
// // // // // // // console.log(`Starting IMDB API Server - Version: ${buildVersion}`);

// // // // // // // // Updated CORS configuration to accept all origins in development
// // // // // // // app.use(cors({
// // // // // // //   origin: '*',  // In production, you should specify exact origins
// // // // // // //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // // // // //   credentials: true
// // // // // // // }));

// // // // // // // app.use(express.json());

// // // // // // // // Root endpoint
// // // // // // // app.get('/', (req, res) => {
// // // // // // //   res.status(200).json({ 
// // // // // // //     message: 'IMDB API Server Running',
// // // // // // //     version: buildVersion,
// // // // // // //     timestamp: new Date().toISOString()
// // // // // // //   });
// // // // // // // });

// // // // // // // // Health check endpoint
// // // // // // // app.get('/api/health', (req, res) => {
// // // // // // //   res.status(200).json({ 
// // // // // // //     status: 'healthy',
// // // // // // //     version: buildVersion,
// // // // // // //     timestamp: new Date().toISOString()
// // // // // // //   });
// // // // // // // });

// // // // // // // // API Routes
// // // // // // // app.use("/api/movies", movieRouter);
// // // // // // // app.use("/api/actors", actorRouter);
// // // // // // // app.use("/api/producers", producerRouter);

// // // // // // // // Updated MongoDB Connection URI to use environment variable
// // // // // // // const MONGO_URI = process.env.MONGO_URL || process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // // // // const connectDB = async (retries = 5) => {
// // // // // // //   while (retries) {
// // // // // // //     try {
// // // // // // //       await mongoose.connect(MONGO_URI, {
// // // // // // //         serverSelectionTimeoutMS: 10000,
// // // // // // //         connectTimeoutMS: 20000
// // // // // // //       });
// // // // // // //       console.log("DB connected successfully");
// // // // // // //       return true;
// // // // // // //     } catch (err) {
// // // // // // //       console.error("MongoDB connection error:", err.message);
// // // // // // //       retries -= 1;
// // // // // // //       if (retries === 0) {
// // // // // // //         console.error("Max retries reached. Exiting...");
// // // // // // //         return false;
// // // // // // //       }
// // // // // // //       console.log(`Retrying connection... (${retries} attempts remaining)`);
// // // // // // //       await new Promise(resolve => setTimeout(resolve, 5000));
// // // // // // //     }
// // // // // // //   }
// // // // // // //   return false;
// // // // // // // };

// // // // // // // // Error handling middleware
// // // // // // // app.use((err, req, res, next) => {
// // // // // // //   console.error(err.stack);
// // // // // // //   res.status(500).json({
// // // // // // //     error: 'Something broke!',
// // // // // // //     version: buildVersion
// // // // // // //   });
// // // // // // // });

// // // // // // // // 404 handler
// // // // // // // app.use((req, res) => {
// // // // // // //   res.status(404).json({
// // // // // // //     error: 'Route not found',
// // // // // // //     version: buildVersion
// // // // // // //   });
// // // // // // // });

// // // // // // // const PORT = process.env.PORT || 5000;

// // // // // // // const startServer = async () => {
// // // // // // //   try {
// // // // // // //     const isConnected = await connectDB();
// // // // // // //     if (!isConnected) {
// // // // // // //       console.error("Failed to connect to MongoDB. Server will not start.");
// // // // // // //       process.exit(1);
// // // // // // //     }
    
// // // // // // //     app.listen(PORT, '0.0.0.0', () => {
// // // // // // //       console.log(`App is listening on port ${PORT}`);
// // // // // // //       console.log(`Version: ${buildVersion}`);
// // // // // // //       console.log(`Health check available at: http://localhost:${PORT}/api/health`);
// // // // // // //     });
// // // // // // //   } catch (err) {
// // // // // // //     console.error('Failed to start server:', err);
// // // // // // //     process.exit(1);
// // // // // // //   }
// // // // // // // };

// // // // // // // process.on('uncaughtException', (err) => {
// // // // // // //   console.error('Uncaught Exception:', err);
// // // // // // //   process.exit(1);
// // // // // // // });

// // // // // // // process.on('unhandledRejection', (err) => {
// // // // // // //   console.error('Unhandled Rejection:', err);
// // // // // // //   process.exit(1);
// // // // // // // });

// // // // // // // startServer();
// // // // // // const express = require("express");
// // // // // // const mongoose = require("mongoose");
// // // // // // require('dotenv').config();
// // // // // // const movieRouter = require("./routes/movie");
// // // // // // const actorRouter = require("./routes/actor");
// // // // // // const producerRouter = require("./routes/producer");
// // // // // // const cors = require("cors");

// // // // // // const app = express();
// // // // // // const buildVersion = process.env.BUILD_VERSION || 'development';

// // // // // // // Initialize middleware
// // // // // // app.use(cors({
// // // // // //     origin: '*',  // Allow all origins in development
// // // // // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // // // //     credentials: true
// // // // // // }));
// // // // // // app.use(express.json());

// // // // // // // Root endpoint
// // // // // // app.get('/', (req, res) => {
// // // // // //     res.status(200).json({ 
// // // // // //         message: 'IMDB API Server Running',
// // // // // //         version: buildVersion,
// // // // // //         timestamp: new Date().toISOString()
// // // // // //     });
// // // // // // });

// // // // // // // Health check endpoint
// // // // // // app.get('/api/health', (req, res) => {
// // // // // //     res.status(200).json({ 
// // // // // //         status: 'healthy',
// // // // // //         version: buildVersion,
// // // // // //         timestamp: new Date().toISOString()
// // // // // //     });
// // // // // // });

// // // // // // // API Routes
// // // // // // app.use("/api/movies", movieRouter);
// // // // // // app.use("/api/actors", actorRouter);
// // // // // // app.use("/api/producers", producerRouter);

// // // // // // // MongoDB Connection Configuration
// // // // // // const MONGO_URL = process.env.MONGO_URL || process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // // // const connectDB = async (retries = 5) => {
// // // // // //     while (retries) {
// // // // // //         try {
// // // // // //             await mongoose.connect(MONGO_URL);
// // // // // //             console.log("✅ MongoDB connected successfully");
// // // // // //             return true;
// // // // // //         } catch (err) {
// // // // // //             console.error("❌ MongoDB connection error:", err.message);
// // // // // //             retries -= 1;
            
// // // // // //             if (retries === 0) {
// // // // // //                 console.error("❌ Max retries reached. Exiting...");
// // // // // //                 return false;
// // // // // //             }
            
// // // // // //             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
// // // // // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // // // // //         }
// // // // // //     }
// // // // // //     return false;
// // // // // // };

// // // // // // // Error handling middleware
// // // // // // app.use((err, req, res, next) => {
// // // // // //     console.error('❌ Error:', err.stack);
// // // // // //     res.status(500).json({
// // // // // //         error: 'Internal Server Error',
// // // // // //         message: 'Something went wrong',
// // // // // //         version: buildVersion
// // // // // //     });
// // // // // // });

// // // // // // // 404 handler
// // // // // // app.use((req, res) => {
// // // // // //     res.status(404).json({
// // // // // //         error: 'Route not found',
// // // // // //         path: req.path,
// // // // // //         version: buildVersion
// // // // // //     });
// // // // // // });

// // // // // // // Server initialization
// // // // // // const PORT = process.env.PORT || 5000;

// // // // // // const startServer = async () => {
// // // // // //     try {
// // // // // //         const isConnected = await connectDB();
        
// // // // // //         if (!isConnected) {
// // // // // //             console.error("❌ Failed to connect to MongoDB. Server will not start.");
// // // // // //             process.exit(1);
// // // // // //         }
        
// // // // // //         app.listen(PORT, '0.0.0.0', () => {
// // // // // //             console.log(`🚀 Server is running on port ${PORT}`);
// // // // // //             console.log(`📦 Version: ${buildVersion}`);
// // // // // //             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// // // // // //         });
// // // // // //     } catch (err) {
// // // // // //         console.error('❌ Failed to start server:', err);
// // // // // //         process.exit(1);
// // // // // //     }
// // // // // // };

// // // // // // // Global error handlers
// // // // // // process.on('uncaughtException', (err) => {
// // // // // //     console.error('❌ Uncaught Exception:', err);
// // // // // //     process.exit(1);
// // // // // // });

// // // // // // process.on('unhandledRejection', (err) => {
// // // // // //     console.error('❌ Unhandled Rejection:', err);
// // // // // //     process.exit(1);
// // // // // // });

// // // // // // // Start the server
// // // // // // startServer();
// // // // // const express = require("express");
// // // // // const mongoose = require("mongoose");
// // // // // require('dotenv').config();
// // // // // const movieRouter = require("./routes/movie");
// // // // // const actorRouter = require("./routes/actor");
// // // // // const producerRouter = require("./routes/producer");
// // // // // const cors = require("cors");

// // // // // const app = express();
// // // // // const buildVersion = process.env.BUILD_VERSION || 'development';

// // // // // // Initialize middleware
// // // // // app.use(cors({
// // // // //     origin: '*',  // Allow all origins in development
// // // // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // // //     credentials: true
// // // // // }));
// // // // // app.use(express.json());

// // // // // // Root endpoint
// // // // // app.get('/', (req, res) => {
// // // // //     res.status(200).json({ 
// // // // //         message: 'IMDB API Server Running',
// // // // //         version: buildVersion,
// // // // //         timestamp: new Date().toISOString()
// // // // //     });
// // // // // });

// // // // // // Health check endpoint
// // // // // app.get('/api/health', (req, res) => {
// // // // //     res.status(200).json({ 
// // // // //         status: 'healthy',
// // // // //         version: buildVersion,
// // // // //         timestamp: new Date().toISOString()
// // // // //     });
// // // // // });

// // // // // // API Routes
// // // // // app.use("/api/movies", movieRouter);
// // // // // app.use("/api/actors", actorRouter);
// // // // // app.use("/api/producers", producerRouter);

// // // // // // MongoDB Connection Configuration
// // // // // const PORT = process.env.PORT || 5000;
// // // // // const MONGO_URL = "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // // const connectDB = async (retries = 5) => {
// // // // //     while (retries) {
// // // // //         try {
// // // // //             await mongoose.connect(MONGO_URL, {
// // // // //                 useNewUrlParser: true,
// // // // //                 useUnifiedTopology: true,
// // // // //             });
// // // // //             console.log("✅ MongoDB connected successfully");
// // // // //             return true;
// // // // //         } catch (err) {
// // // // //             console.error("❌ MongoDB connection error:", err.message);
// // // // //             retries -= 1;
            
// // // // //             if (retries === 0) {
// // // // //                 console.error("❌ Max retries reached. Exiting...");
// // // // //                 return false;
// // // // //             }
            
// // // // //             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
// // // // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // // // //         }
// // // // //     }
// // // // //     return false;
// // // // // };

// // // // // // Error handling middleware
// // // // // app.use((err, req, res, next) => {
// // // // //     console.error('❌ Error:', err.stack);
// // // // //     res.status(500).json({
// // // // //         error: 'Internal Server Error',
// // // // //         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
// // // // //         version: buildVersion
// // // // //     });
// // // // // });

// // // // // // 404 handler
// // // // // app.use((req, res) => {
// // // // //     res.status(404).json({
// // // // //         error: 'Route not found',
// // // // //         path: req.path,
// // // // //         version: buildVersion
// // // // //     });
// // // // // });

// // // // // // Server initialization
// // // // // const startServer = async () => {
// // // // //     console.log(`Starting IMDB API Server - Version: ${buildVersion}`);
    
// // // // //     try {
// // // // //         const isConnected = await connectDB();
        
// // // // //         if (!isConnected) {
// // // // //             console.error("❌ Failed to connect to MongoDB. Server will not start.");
// // // // //             process.exit(1);
// // // // //         }
        
// // // // //         app.listen(PORT, '0.0.0.0', () => {
// // // // //             console.log(`🚀 Server is running on port ${PORT}`);
// // // // //             console.log(`📦 Version: ${buildVersion}`);
// // // // //             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// // // // //         });
// // // // //     } catch (err) {
// // // // //         console.error('❌ Failed to start server:', err);
// // // // //         process.exit(1);
// // // // //     }
// // // // // };

// // // // // // Global error handlers
// // // // // process.on('uncaughtException', (err) => {
// // // // //     console.error('❌ Uncaught Exception:', err);
// // // // //     process.exit(1);
// // // // // });

// // // // // process.on('unhandledRejection', (err) => {
// // // // //     console.error('❌ Unhandled Rejection:', err);
// // // // //     process.exit(1);
// // // // // });

// // // // // // Start the server
// // // // // startServer();

// // // // // module.exports = app; // For testing purposes
// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // require('dotenv').config();
// // // // const movieRouter = require("./routes/movie");
// // // // const actorRouter = require("./routes/actor");
// // // // const producerRouter = require("./routes/producer");
// // // // const cors = require("cors");

// // // // const app = express();
// // // // const buildVersion = process.env.BUILD_VERSION || 'development';

// // // // // Initialize middleware
// // // // app.use(cors({
// // // //     origin: '*',
// // // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // // //     credentials: true
// // // // }));
// // // // app.use(express.json());

// // // // // Root endpoint
// // // // app.get('/', (req, res) => {
// // // //     res.status(200).json({ 
// // // //         message: 'IMDB API Server Running',
// // // //         version: buildVersion,
// // // //         timestamp: new Date().toISOString()
// // // //     });
// // // // });

// // // // // Health check endpoint
// // // // app.get('/api/health', (req, res) => {
// // // //     res.status(200).json({ 
// // // //         status: 'healthy',
// // // //         version: buildVersion,
// // // //         timestamp: new Date().toISOString()
// // // //     });
// // // // });

// // // // // API Routes
// // // // app.use("/api/movies", movieRouter);
// // // // app.use("/api/actors", actorRouter);
// // // // app.use("/api/producers", producerRouter);

// // // // // MongoDB Connection Configuration
// // // // const PORT = process.env.PORT || 5000;
// // // // const MONGO_URL = "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // const connectDB = async (retries = 5) => {
// // // //     console.log("Starting IMDB API Server - Version:", buildVersion);
    
// // // //     while (retries) {
// // // //         try {
// // // //             // Ensure we're using the correct MongoDB URL
// // // //             const dbUrl = process.env.MONGO_URL || MONGO_URL;
// // // //             console.log("Attempting to connect to MongoDB...");
            
// // // //             await mongoose.connect(dbUrl, {
// // // //                 useNewUrlParser: true,
// // // //                 useUnifiedTopology: true,
// // // //                 serverSelectionTimeoutMS: 5000
// // // //             });
            
// // // //             console.log("✅ MongoDB connected successfully");
// // // //             return true;
// // // //         } catch (err) {
// // // //             console.error("❌ MongoDB connection error:", err.message);
// // // //             retries -= 1;
            
// // // //             if (retries === 0) {
// // // //                 console.error("❌ Max retries reached. Exiting...");
// // // //                 return false;
// // // //             }
            
// // // //             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
// // // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // // //         }
// // // //     }
// // // //     return false;
// // // // };

// // // // // Error handling middleware
// // // // app.use((err, req, res, next) => {
// // // //     console.error('❌ Error:', err.stack);
// // // //     res.status(500).json({
// // // //         error: 'Internal Server Error',
// // // //         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
// // // //         version: buildVersion
// // // //     });
// // // // });

// // // // // 404 handler
// // // // app.use((req, res) => {
// // // //     res.status(404).json({
// // // //         error: 'Route not found',
// // // //         path: req.path,
// // // //         version: buildVersion
// // // //     });
// // // // });

// // // // // Server initialization
// // // // const startServer = async () => {
// // // //     try {
// // // //         const isConnected = await connectDB();
        
// // // //         if (!isConnected) {
// // // //             console.error("❌ Failed to connect to MongoDB. Server will not start.");
// // // //             process.exit(1);
// // // //         }
        
// // // //         app.listen(PORT, '0.0.0.0', () => {
// // // //             console.log(`🚀 Server is running on port ${PORT}`);
// // // //             console.log(`📦 Version: ${buildVersion}`);
// // // //             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// // // //         });
// // // //     } catch (err) {
// // // //         console.error('❌ Failed to start server:', err);
// // // //         process.exit(1);
// // // //     }
// // // // };

// // // // // Global error handlers
// // // // process.on('uncaughtException', (err) => {
// // // //     console.error('❌ Uncaught Exception:', err);
// // // //     process.exit(1);
// // // // });

// // // // process.on('unhandledRejection', (err) => {
// // // //     console.error('❌ Unhandled Rejection:', err);
// // // //     process.exit(1);
// // // // });

// // // // // Start the server
// // // // startServer();

// // // // module.exports = app;
// // // require('dotenv').config();
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const cors = require("cors");

// // // const movieRouter = require("./routes/movie");
// // // const actorRouter = require("./routes/actor");
// // // const producerRouter = require("./routes/producer");

// // // const app = express();
// // // const buildVersion = process.env.BUILD_VERSION || 'development';
// // // const PORT = process.env.PORT || 5000;
// // // const DEFAULT_MONGO_URL = "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // // Validate MongoDB URL
// // // const validateMongoUrl = (url) => {
// // //     if (!url) {
// // //         throw new Error("MongoDB URL is required");
// // //     }
// // //     if (!url.startsWith('mongodb://') && !url.startsWith('mongodb+srv://')) {
// // //         throw new Error("Invalid MongoDB URL format. Must start with mongodb:// or mongodb+srv://");
// // //     }
// // //     return url;
// // // };

// // // // Initialize middleware
// // // app.use(cors({
// // //     origin: '*',
// // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // //     credentials: true
// // // }));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Basic request logging middleware
// // // app.use((req, res, next) => {
// // //     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
// // //     next();
// // // });

// // // // Root endpoint
// // // app.get('/', (req, res) => {
// // //     res.status(200).json({ 
// // //         message: 'IMDB API Server Running',
// // //         version: buildVersion,
// // //         timestamp: new Date().toISOString()
// // //     });
// // // });

// // // // Health check endpoint
// // // app.get('/api/health', (req, res) => {
// // //     const isDbConnected = mongoose.connection.readyState === 1;
    
// // //     res.status(isDbConnected ? 200 : 503).json({ 
// // //         status: isDbConnected ? 'healthy' : 'unhealthy',
// // //         version: buildVersion,
// // //         timestamp: new Date().toISOString(),
// // //         database: {
// // //             connected: isDbConnected,
// // //             state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
// // //         }
// // //     });
// // // });

// // // // API Routes
// // // app.use("/api/movies", movieRouter);
// // // app.use("/api/actors", actorRouter);
// // // app.use("/api/producers", producerRouter);

// // // // MongoDB Connection Configuration
// // // const connectDB = async (retries = 5) => {
// // //     console.log("Starting IMDB API Server - Version:", buildVersion);
    
// // //     while (retries) {
// // //         try {
// // //             // Get MongoDB URL from environment variable or use default
// // //             const dbUrl = validateMongoUrl(process.env.MONGO_URL || DEFAULT_MONGO_URL);
// // //             console.log("Attempting to connect to MongoDB...");
            
// // //             await mongoose.connect(dbUrl, {
// // //                 useNewUrlParser: true,
// // //                 useUnifiedTopology: true,
// // //                 serverSelectionTimeoutMS: 5000,
// // //                 connectTimeoutMS: 10000,
// // //                 socketTimeoutMS: 45000,
// // //                 family: 4,
// // //                 retryWrites: true,
// // //                 w: 'majority'
// // //             });
            
// // //             console.log("✅ MongoDB connected successfully");
// // //             return true;
// // //         } catch (err) {
// // //             console.error("❌ MongoDB connection error:", err.message);
// // //             retries -= 1;
            
// // //             if (retries === 0) {
// // //                 console.error("❌ Max retries reached. Exiting...");
// // //                 return false;
// // //             }
            
// // //             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
// // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // //         }
// // //     }
// // //     return false;
// // // };

// // // // Mongoose error handling
// // // mongoose.connection.on('error', (err) => {
// // //     console.error('MongoDB connection error:', err);
// // // });

// // // mongoose.connection.on('disconnected', () => {
// // //     console.log('MongoDB disconnected');
// // // });

// // // mongoose.connection.on('reconnected', () => {
// // //     console.log('MongoDB reconnected');
// // // });

// // // // Error handling middleware
// // // app.use((err, req, res, next) => {
// // //     console.error('❌ Error:', err.stack);
// // //     res.status(err.status || 500).json({
// // //         error: err.name || 'Internal Server Error',
// // //         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
// // //         version: buildVersion
// // //     });
// // // });

// // // // 404 handler
// // // app.use((req, res) => {
// // //     res.status(404).json({
// // //         error: 'Route not found',
// // //         path: req.path,
// // //         method: req.method,
// // //         version: buildVersion
// // //     });
// // // });

// // // // Graceful shutdown handler
// // // const gracefulShutdown = async () => {
// // //     try {
// // //         console.log('🔄 Initiating graceful shutdown...');
        
// // //         // Close MongoDB connection
// // //         if (mongoose.connection.readyState === 1) {
// // //             await mongoose.connection.close();
// // //             console.log('📝 MongoDB connection closed');
// // //         }
        
// // //         process.exit(0);
// // //     } catch (err) {
// // //         console.error('❌ Error during graceful shutdown:', err);
// // //         process.exit(1);
// // //     }
// // // };

// // // // Server initialization
// // // const startServer = async () => {
// // //     try {
// // //         const isConnected = await connectDB();
        
// // //         if (!isConnected) {
// // //             console.error("❌ Failed to connect to MongoDB. Server will not start.");
// // //             process.exit(1);
// // //         }
        
// // //         const server = app.listen(PORT, '0.0.0.0', () => {
// // //             console.log(`🚀 Server is running on port ${PORT}`);
// // //             console.log(`📦 Version: ${buildVersion}`);
// // //             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// // //         });

// // //         // Server error handling
// // //         server.on('error', (err) => {
// // //             console.error('Server error:', err);
// // //             process.exit(1);
// // //         });

// // //     } catch (err) {
// // //         console.error('❌ Failed to start server:', err);
// // //         process.exit(1);
// // //     }
// // // };

// // // // Global error handlers
// // // process.on('uncaughtException', (err) => {
// // //     console.error('❌ Uncaught Exception:', err);
// // //     process.exit(1);
// // // });

// // // process.on('unhandledRejection', (err) => {
// // //     console.error('❌ Unhandled Rejection:', err);
// // //     process.exit(1);
// // // });

// // // // Shutdown signals
// // // process.on('SIGTERM', gracefulShutdown);
// // // process.on('SIGINT', gracefulShutdown);

// // // // Start the server
// // // startServer();

// // // module.exports = app;
// // require('dotenv').config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const movieRouter = require("./routes/movie");
// // const actorRouter = require("./routes/actor");
// // const producerRouter = require("./routes/producer");

// // const app = express();
// // const buildVersion = process.env.BUILD_VERSION || 'development';
// // const PORT = process.env.PORT || 5000;

// // // Initialize middleware
// // app.use(cors({
// //     origin: '*',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     credentials: true
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Basic request logging middleware
// // app.use((req, res, next) => {
// //     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
// //     next();
// // });

// // // Root endpoint
// // app.get('/', (req, res) => {
// //     res.status(200).json({ 
// //         message: 'IMDB API Server Running',
// //         version: buildVersion,
// //         timestamp: new Date().toISOString()
// //     });
// // });

// // // Health check endpoint
// // app.get('/api/health', (req, res) => {
// //     const isDbConnected = mongoose.connection.readyState === 1;
    
// //     res.status(isDbConnected ? 200 : 503).json({ 
// //         status: isDbConnected ? 'healthy' : 'unhealthy',
// //         version: buildVersion,
// //         timestamp: new Date().toISOString(),
// //         database: {
// //             connected: isDbConnected,
// //             state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
// //         }
// //     });
// // });

// // // API Routes
// // app.use("/api/movies", movieRouter);
// // app.use("/api/actors", actorRouter);
// // app.use("/api/producers", producerRouter);

// // // MongoDB Connection Configuration
// // const connectDB = async (retries = 5) => {
// //     console.log("Starting IMDB API Server - Version:", buildVersion);
    
// //     while (retries) {
// //         try {
// //             const mongoUrl = process.env.MONGO_URL;
// //             if (!mongoUrl) {
// //                 throw new Error("MongoDB URL is not provided");
// //             }

// //             console.log("Attempting to connect to MongoDB...");
            
// //             await mongoose.connect(mongoUrl, {
// //                 useNewUrlParser: true,
// //                 useUnifiedTopology: true,
// //                 serverSelectionTimeoutMS: 5000,
// //                 connectTimeoutMS: 10000,
// //                 socketTimeoutMS: 45000,
// //                 family: 4,
// //                 retryWrites: true,
// //                 w: 'majority'
// //             });
            
// //             console.log("✅ MongoDB connected successfully");
// //             return true;
// //         } catch (err) {
// //             console.error("❌ MongoDB connection error:", err.message);
// //             retries -= 1;
            
// //             if (retries === 0) {
// //                 console.error("❌ Max retries reached. Exiting...");
// //                 process.exit(1);
// //             }
            
// //             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
// //             await new Promise(resolve => setTimeout(resolve, 5000));
// //         }
// //     }
// //     return false;
// // };

// // // Mongoose error handling
// // mongoose.connection.on('error', (err) => {
// //     console.error('MongoDB connection error:', err);
// // });

// // mongoose.connection.on('disconnected', () => {
// //     console.log('MongoDB disconnected');
// // });

// // mongoose.connection.on('reconnected', () => {
// //     console.log('MongoDB reconnected');
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //     console.error('❌ Error:', err.stack);
// //     res.status(err.status || 500).json({
// //         error: err.name || 'Internal Server Error',
// //         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
// //         version: buildVersion
// //     });
// // });

// // // 404 handler
// // app.use((req, res) => {
// //     res.status(404).json({
// //         error: 'Route not found',
// //         path: req.path,
// //         method: req.method,
// //         version: buildVersion
// //     });
// // });

// // // Graceful shutdown handler
// // const gracefulShutdown = async () => {
// //     try {
// //         console.log('🔄 Initiating graceful shutdown...');
        
// //         if (mongoose.connection.readyState === 1) {
// //             await mongoose.connection.close();
// //             console.log('📝 MongoDB connection closed');
// //         }
        
// //         process.exit(0);
// //     } catch (err) {
// //         console.error('❌ Error during graceful shutdown:', err);
// //         process.exit(1);
// //     }
// // };

// // // Server initialization
// // const startServer = async () => {
// //     try {
// //         const isConnected = await connectDB();
        
// //         if (!isConnected) {
// //             console.error("❌ Failed to connect to MongoDB. Server will not start.");
// //             process.exit(1);
// //         }
        
// //         const server = app.listen(PORT, '0.0.0.0', () => {
// //             console.log(`🚀 Server is running on port ${PORT}`);
// //             console.log(`📦 Version: ${buildVersion}`);
// //             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// //         });

// //         server.on('error', (err) => {
// //             console.error('Server error:', err);
// //             process.exit(1);
// //         });

// //     } catch (err) {
// //         console.error('❌ Failed to start server:', err);
// //         process.exit(1);
// //     }
// // };

// // // Global error handlers
// // process.on('uncaughtException', (err) => {
// //     console.error('❌ Uncaught Exception:', err);
// //     process.exit(1);
// // });

// // process.on('unhandledRejection', (err) => {
// //     console.error('❌ Unhandled Rejection:', err);
// //     process.exit(1);
// // });

// // // Shutdown signals
// // process.on('SIGTERM', gracefulShutdown);
// // process.on('SIGINT', gracefulShutdown);

// // // Start the server
// // startServer();

// // module.exports = app;
// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const movieRouter = require("./routes/movie");
// const actorRouter = require("./routes/actor");
// const producerRouter = require("./routes/producer");

// const app = express();
// const buildVersion = process.env.BUILD_VERSION || 'development';
// const PORT = process.env.PORT || 5000;
// const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://JAYACHANDRAN:KQJrxDn44181NsqT@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Initialize middleware
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Basic request logging middleware
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//     next();
// });

// // Root endpoint
// app.get('/', (req, res) => {
//     res.status(200).json({ 
//         message: 'IMDB API Server Running',
//         version: buildVersion,
//         timestamp: new Date().toISOString()
//     });
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//     const isDbConnected = mongoose.connection.readyState === 1;
    
//     res.status(isDbConnected ? 200 : 503).json({ 
//         status: isDbConnected ? 'healthy' : 'unhealthy',
//         version: buildVersion,
//         timestamp: new Date().toISOString(),
//         database: {
//             connected: isDbConnected,
//             state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
//         }
//     });
// });

// // API Routes
// app.use("/api/movies", movieRouter);
// app.use("/api/actors", actorRouter);
// app.use("/api/producers", producerRouter);

// // MongoDB Connection Configuration
// const connectDB = async (retries = 5) => {
//     console.log("Starting IMDB API Server - Version:", buildVersion);
    
//     while (retries) {
//         try {
//             console.log("Attempting to connect to MongoDB...");
            
//             await mongoose.connect(MONGO_URL, {
//                 serverSelectionTimeoutMS: 5000,
//                 connectTimeoutMS: 10000,
//                 socketTimeoutMS: 45000,
//                 family: 4
//             });
            
//             console.log("✅ MongoDB connected successfully");
//             return true;
//         } catch (err) {
//             console.error("❌ MongoDB connection error:", err.message);
//             console.error(err.stack);
//             retries -= 1;
            
//             if (retries === 0) {
//                 console.error("❌ Max retries reached. Exiting...");
//                 process.exit(1);
//             }
            
//             console.log(`⏳ Retrying connection... (${retries} attempts remaining)`);
//             await new Promise(resolve => setTimeout(resolve, 5000));
//         }
//     }
//     return false;
// };

// // Mongoose error handling
// mongoose.connection.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('MongoDB disconnected');
// });

// mongoose.connection.on('reconnected', () => {
//     console.log('MongoDB reconnected');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('❌ Error:', err.stack);
//     res.status(err.status || 500).json({
//         error: err.name || 'Internal Server Error',
//         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
//         version: buildVersion
//     });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).json({
//         error: 'Route not found',
//         path: req.path,
//         method: req.method,
//         version: buildVersion
//     });
// });

// // Graceful shutdown handler
// const gracefulShutdown = async () => {
//     try {
//         console.log('🔄 Initiating graceful shutdown...');
        
//         if (mongoose.connection.readyState === 1) {
//             await mongoose.connection.close();
//             console.log('📝 MongoDB connection closed');
//         }
        
//         process.exit(0);
//     } catch (err) {
//         console.error('❌ Error during graceful shutdown:', err);
//         process.exit(1);
//     }
// };

// // Server initialization
// const startServer = async () => {
//     try {
//         const isConnected = await connectDB();
        
//         if (!isConnected) {
//             console.error("❌ Failed to connect to MongoDB. Server will not start.");
//             process.exit(1);
//         }
        
//         const server = app.listen(PORT, '0.0.0.0', () => {
//             console.log(`🚀 Server is running on port ${PORT}`);
//             console.log(`📦 Version: ${buildVersion}`);
//             console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
//         });

//         server.on('error', (err) => {
//             console.error('Server error:', err);
//             process.exit(1);
//         });

//     } catch (err) {
//         console.error('❌ Failed to start server:', err);
//         process.exit(1);
//     }
// };

// // Global error handlers
// process.on('uncaughtException', (err) => {
//     console.error('❌ Uncaught Exception:', err);
//     process.exit(1);
// });

// process.on('unhandledRejection', (err) => {
//     console.error('❌ Unhandled Rejection:', err);
//     process.exit(1);
// });

// // Shutdown signals
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGINT', gracefulShutdown);

// // Start the server
// startServer();

// module.exports = app;
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
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://JAYACHANDRAN:KQJrxDn44181NsqT@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
                useNewUrlParser: true,
                useUnifiedTopology: true,
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

// Mongoose error handling
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
