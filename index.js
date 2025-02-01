// // const express = require("express");
// // const mongoose = require("mongoose");
// // require('dotenv').config();
// // const movieRouter = require("./routes/movie");
// // const actorRouter = require("./routes/actor");
// // const producerRouter = require("./routes/producer");
// // const cors = require("cors");

// // const app = express();

// // // Print version/build info on startup
// // const buildVersion = process.env.BUILD_VERSION || 'development';
// // console.log(`Starting IMDB API Server - Version: ${buildVersion}`);

// // // CORS configuration - Fixed quotes around all methods
// // app.use(cors({
// //   origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true
// // }));

// // app.use(express.json());

// // // Root endpoint with version info
// // app.get('/', (req, res) => {
// //   res.status(200).json({ 
// //     message: 'IMDB API Server Running',
// //     version: buildVersion
// //   });
// // });

// // // Health check endpoint
// // app.get('/api/health', (req, res) => {
// //   res.status(200).json({ 
// //     status: 'healthy',
// //     version: buildVersion
// //   });
// // });

// // app.use("/api/movies", movieRouter);
// // app.use("/api/actors", actorRouter);
// // app.use("/api/producers", producerRouter);

// // const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // const connectDB = async (retries = 5) => {
// //   while (retries) {
// //     try {
// //       await mongoose.connect(MONGO_URI, {
// //         serverSelectionTimeoutMS: 10000,
// //         connectTimeoutMS: 20000,
// //       });
// //       console.log("DB connected successfully");
// //       return true;
// //     } catch (err) {
// //       console.error("MongoDB connection error:", err.message);
// //       retries -= 1;
// //       if (retries === 0) {
// //         console.error("Max retries reached. Exiting...");
// //         return false;
// //       }
// //       console.log(`Retrying connection... (${retries} attempts remaining)`);
// //       await new Promise(resolve => setTimeout(resolve, 5000));
// //     }
// //   }
// //   return false;
// // };

// // const PORT = process.env.PORT || 5000;

// // const startServer = async () => {
// //   try {
// //     const isConnected = await connectDB();
// //     if (!isConnected) {
// //       console.error("Failed to connect to MongoDB. Server will not start.");
// //       process.exit(1);
// //     }
    
// //     app.listen(PORT, '0.0.0.0', () => {
// //       console.log(`App is listening on port ${PORT}`);
// //       console.log(`Version: ${buildVersion}`);
// //     });
// //   } catch (err) {
// //     console.error('Failed to start server:', err);
// //     process.exit(1);
// //   }
// // };

// // startServer();
// const express = require("express");
// const mongoose = require("mongoose");
// require('dotenv').config();
// const movieRouter = require("./routes/movie");
// const actorRouter = require("./routes/actor");
// const producerRouter = require("./routes/producer");
// const cors = require("cors");

// const app = express();

// // Print version/build info on startup
// const buildVersion = process.env.BUILD_VERSION || 'development';
// console.log(`Starting IMDB API Server - Version: ${buildVersion}`);

// // CORS configuration
// app.use(cors({
//   origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// // Middleware
// app.use(express.json());

// // Root endpoint with version info
// app.get('/', (req, res) => {
//   res.status(200).json({ 
//     message: 'IMDB API Server Running',
//     version: buildVersion,
//     timestamp: new Date().toISOString()
//   });
// });

// // Health check endpoint - Fixed the route
// app.get('/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'healthy',
//     version: buildVersion,
//     timestamp: new Date().toISOString()
//   });
// });

// // API Routes
// app.use("/api/movies", movieRouter);
// app.use("/api/actors", actorRouter);
// app.use("/api/producers", producerRouter);

// // MongoDB Connection URI - Using environment variable with fallback
// const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // MongoDB connection function with retries
// const connectDB = async (retries = 5) => {
//   while (retries) {
//     try {
//       await mongoose.connect(MONGO_URI, {
//         serverSelectionTimeoutMS: 10000,
//         connectTimeoutMS: 20000,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log("DB connected successfully");
//       return true;
//     } catch (err) {
//       console.error("MongoDB connection error:", err.message);
//       retries -= 1;
//       if (retries === 0) {
//         console.error("Max retries reached. Exiting...");
//         return false;
//       }
//       console.log(`Retrying connection... (${retries} attempts remaining)`);
//       await new Promise(resolve => setTimeout(resolve, 5000));
//     }
//   }
//   return false;
// };

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Something broke!',
//     version: buildVersion
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     error: 'Route not found',
//     version: buildVersion
//   });
// });

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     const isConnected = await connectDB();
//     if (!isConnected) {
//       console.error("Failed to connect to MongoDB. Server will not start.");
//       process.exit(1);
//     }
    
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`App is listening on port ${PORT}`);
//       console.log(`Version: ${buildVersion}`);
//       console.log(`Health check available at: http://localhost:${PORT}/health`);
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// };

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
//   process.exit(1);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   process.exit(1);
// });

// startServer();
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const producerRouter = require("./routes/producer");
const cors = require("cors");

const app = express();

const buildVersion = process.env.BUILD_VERSION || 'development';
console.log(`Starting IMDB API Server - Version: ${buildVersion}`);

app.use(cors({
  origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'IMDB API Server Running',
    version: buildVersion,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint - Keeping it under /api for consistency
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    version: buildVersion,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/movies", movieRouter);
app.use("/api/actors", actorRouter);
app.use("/api/producers", producerRouter);

// MongoDB Connection URI
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc%403747%40jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 20000,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DB connected successfully");
      return true;
    } catch (err) {
      console.error("MongoDB connection error:", err.message);
      retries -= 1;
      if (retries === 0) {
        console.error("Max retries reached. Exiting...");
        return false;
      }
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  return false;
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    version: buildVersion
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    version: buildVersion
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error("Failed to connect to MongoDB. Server will not start.");
      process.exit(1);
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`App is listening on port ${PORT}`);
      console.log(`Version: ${buildVersion}`);
      console.log(`Health check available at: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
