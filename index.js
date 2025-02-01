// // // // // // const express = require("express");
// // // // // // const mongoose = require("mongoose")
// // // // // // require('dotenv').config()
// // // // // // const movieRouter = require("./routes/movie")
// // // // // // const actorRouter = require("./routes/actor")
// // // // // // const producerRouter = require("./routes/producer")
// // // // // // const cors = require("cors")

// // // // // // mongoose.set("strictQuery", false);

// // // // // // mongoose.connect(process.env.MONGO_URL).then(()=>{
// // // // // //     console.log("DB connected successfully");
// // // // // // }).catch((err) => {
// // // // // //     console.log(err);
// // // // // // })

// // // // // // const app = express();

// // // // // // app.use(express.json());
// // // // // // app.use(cors());
// // // // // // app.use("/movies",movieRouter)
// // // // // // app.use("/actors",actorRouter)
// // // // // // app.use("/producers",producerRouter)

// // // // // // app.listen(process.env.PORT,()=>{
// // // // // //     console.log(`App is listening on port ${process.env.PORT}`)
// // // // // // })
// // // // // const express = require("express");
// // // // // const mongoose = require("mongoose")
// // // // // require('dotenv').config()
// // // // // const movieRouter = require("./routes/movie")
// // // // // const actorRouter = require("./routes/actor")
// // // // // const producerRouter = require("./routes/producer")
// // // // // const cors = require("cors")

// // // // // mongoose.set("strictQuery", false);

// // // // // // Add health check endpoint
// // // // // app.get('/api/health', (req, res) => {
// // // // //     res.status(200).json({ status: 'healthy' });
// // // // // });

// // // // // // Add error handling for MongoDB connection
// // // // // const connectDB = async () => {
// // // // //     try {
// // // // //         await mongoose.connect(process.env.MONGO_URL, {
// // // // //             useNewUrlParser: true,
// // // // //             useUnifiedTopology: true,
// // // // //         });
// // // // //         console.log("DB connected successfully");
// // // // //     } catch (err) {
// // // // //         console.error("MongoDB connection error:", err);
// // // // //         process.exit(1);
// // // // //     }
// // // // // };

// // // // // const app = express();
// // // // // app.use(express.json());
// // // // // app.use(cors());
// // // // // app.use("/movies", movieRouter)
// // // // // app.use("/actors", actorRouter)
// // // // // app.use("/producers", producerRouter)

// // // // // // Connect to MongoDB
// // // // // connectDB();

// // // // // const PORT = process.env.PORT || 5000;
// // // // // app.listen(PORT, '0.0.0.0', () => {
// // // // //     console.log(`App is listening on port ${PORT}`)
// // // // // });
// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // require('dotenv').config();
// // // // const movieRouter = require("./routes/movie");
// // // // const actorRouter = require("./routes/actor");
// // // // const producerRouter = require("./routes/producer");
// // // // const cors = require("cors");

// // // // mongoose.set("strictQuery", false);

// // // // const app = express();

// // // // // Middleware
// // // // app.use(express.json());
// // // // app.use(cors());

// // // // // Health check endpoint
// // // // app.get('/api/health', (req, res) => {
// // // //     res.status(200).json({ status: 'healthy' });
// // // // });

// // // // // Routes
// // // // app.use("/movies", movieRouter);
// // // // app.use("/actors", actorRouter);
// // // // app.use("/producers", producerRouter);

// // // // // MongoDB connection with retry logic
// // // // const connectDB = async (retries = 5) => {
// // // //     while (retries) {
// // // //         try {
// // // //             await mongoose.connect(process.env.MONGO_URL, {
// // // //                 useNewUrlParser: true,
// // // //                 useUnifiedTopology: true,
// // // //                 serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
// // // //             });
// // // //             console.log("DB connected successfully");
// // // //             return;
// // // //         } catch (err) {
// // // //             console.error("MongoDB connection error:", err);
// // // //             retries -= 1;
// // // //             if (retries === 0) {
// // // //                 process.exit(1);
// // // //             }
// // // //             // Wait for 5 seconds before retrying
// // // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // // //             console.log(`Retrying connection... (${retries} attempts remaining)`);
// // // //         }
// // // //     }
// // // // };

// // // // const PORT = process.env.PORT || 5000;

// // // // // Start server only after attempting DB connection
// // // // const startServer = async () => {
// // // //     await connectDB();
// // // //     app.listen(PORT, '0.0.0.0', () => {
// // // //         console.log(`App is listening on port ${PORT}`);
// // // //     });
// // // // };

// // // // startServer().catch(err => {
// // // //     console.error('Failed to start server:', err);
// // // //     process.exit(1);
// // // // });
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // require('dotenv').config();
// // // const movieRouter = require("./routes/movie");
// // // const actorRouter = require("./routes/actor");
// // // const producerRouter = require("./routes/producer");
// // // const cors = require("cors");

// // // mongoose.set("strictQuery", false);
// // // const app = express();

// // // // Middleware
// // // app.use(express.json());
// // // app.use(cors());

// // // // Health check endpoint
// // // app.get('/api/health', (req, res) => {
// // //     res.status(200).json({ status: 'healthy' });
// // // });

// // // app.use("/api/movies", movieRouter);
// // // app.use("/api/actors", actorRouter);
// // // app.use("/api/producers", producerRouter);

// // // // MongoDB Atlas connection with retry logic
// // // const MONGO_URI = "mongodb+srv://jayachandran:jc@3747@jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // const connectDB = async (retries = 5) => {
// // //     while (retries) {
// // //         try {
// // //             await mongoose.connect(MONGO_URI, {
// // //                 useNewUrlParser: true,
// // //                 useUnifiedTopology: true,
// // //                 serverSelectionTimeoutMS: 10000,
// // //                 connectTimeoutMS: 20000,
// // //             });
// // //             console.log("DB connected successfully to MongoDB Atlas");
// // //             return true;
// // //         } catch (err) {
// // //             console.error("MongoDB Atlas connection error:", err.message);
// // //             retries -= 1;
// // //             if (retries === 0) {
// // //                 console.error("Max retries reached. Exiting...");
// // //                 return false;
// // //             }
// // //             console.log(`Retrying connection... (${retries} attempts remaining)`);
// // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // //         }
// // //     }
// // //     return false;
// // // };

// // // const PORT = process.env.PORT || 5000;

// // // const startServer = async () => {
// // //     try {
// // //         const isConnected = await connectDB();
// // //         if (!isConnected) {
// // //             console.error("Failed to connect to MongoDB Atlas. Server will not start.");
// // //             process.exit(1);
// // //         }

// // //         app.listen(PORT, '0.0.0.0', () => {
// // //             console.log(`App is listening on port ${PORT}`);
// // //         });
// // //     } catch (err) {
// // //         console.error('Failed to start server:', err);
// // //         process.exit(1);
// // //     }
// // // };

// // // // Error handlers
// // // process.on('unhandledRejection', (err) => {
// // //     console.error('Unhandled Rejection:', err);
// // // });

// // // process.on('uncaughtException', (err) => {
// // //     console.error('Uncaught Exception:', err);
// // //     process.exit(1);
// // // });

// // // startServer();

// // // // backend/index.js
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // require('dotenv').config();
// // // const movieRouter = require("./routes/movie");
// // // const actorRouter = require("./routes/actor");
// // // const producerRouter = require("./routes/producer");
// // // const cors = require("cors");

// // // const app = express();

// // // // CORS configuration - place this before routes
// // // app.use(cors({
// // //   origin: '*', // In production, specify your frontend domain
// // //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // //   allowedHeaders: ['Content-Type']
// // // }));

// // // // Middleware
// // // app.use(express.json());

// // // // Health check endpoint
// // // app.get('/api/health', (req, res) => {
// // //     res.status(200).json({ status: 'healthy' });
// // // });

// // // // Routes
// // // app.use("/api/movies", movieRouter);
// // // app.use("/api/actors", actorRouter);
// // // app.use("/api/producers", producerRouter);

// // // // MongoDB Atlas connection with retry logic
// // // const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc@3747@jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // const connectDB = async (retries = 5) => {
// // //     while (retries) {
// // //         try {
// // //             await mongoose.connect(MONGO_URI, {
// // //                 useNewUrlParser: true,
// // //                 useUnifiedTopology: true,
// // //                 serverSelectionTimeoutMS: 10000,
// // //                 connectTimeoutMS: 20000,
// // //             });
// // //             console.log("DB connected successfully to MongoDB Atlas");
// // //             return true;
// // //         } catch (err) {
// // //             console.error("MongoDB Atlas connection error:", err.message);
// // //             retries -= 1;
// // //             if (retries === 0) {
// // //                 console.error("Max retries reached. Exiting...");
// // //                 return false;
// // //             }
// // //             console.log(`Retrying connection... (${retries} attempts remaining)`);
// // //             await new Promise(resolve => setTimeout(resolve, 5000));
// // //         }
// // //     }
// // //     return false;
// // // };

// // // const PORT = process.env.PORT || 5000;

// // // const startServer = async () => {
// // //     try {
// // //         const isConnected = await connectDB();
// // //         if (!isConnected) {
// // //             console.error("Failed to connect to MongoDB Atlas. Server will not start.");
// // //             process.exit(1);
// // //         }
// // //         app.listen(PORT, '0.0.0.0', () => {
// // //             console.log(`App is listening on port ${PORT}`);
// // //         });
// // //     } catch (err) {
// // //         console.error('Failed to start server:', err);
// // //         process.exit(1);
// // //     }
// // // };

// // // // Error handlers
// // // process.on('unhandledRejection', (err) => {
// // //     console.error('Unhandled Rejection:', err);
// // // });

// // // process.on('uncaughtException', (err) => {
// // //     console.error('Uncaught Exception:', err);
// // //     process.exit(1);
// // // });

// // // startServer();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // require('dotenv').config();
// // const movieRouter = require("./routes/movie");
// // const actorRouter = require("./routes/actor");
// // const producerRouter = require("./routes/producer");
// // const cors = require("cors");

// // const app = express();

// // // CORS configuration
// // app.use(cors({
// //   origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
// //   methods: ['GET', 'POST', PUT, 'DELETE'],
// //   credentials: true
// // }));

// // app.use(express.json());

// // // Root endpoint
// // app.get('/', (req, res) => {
// //   res.status(200).json({ message: 'IMDB API Server Running' });
// // });

// // // Health check endpoint
// // app.get('/api/health', (req, res) => {
// //   res.status(200).json({ status: 'healthy' });
// // });

// // app.use("/api/movies", movieRouter);
// // app.use("/api/actors", actorRouter);
// // app.use("/api/producers", producerRouter);

// // const MONGO_URI = "mongodb+srv://jayachandran:jc@3747@jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

// // CORS configuration
// app.use(cors({
//   origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Fixed: Added quotes around 'PUT'
//   credentials: true
// }));

// app.use(express.json());

// // Root endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'IMDB API Server Running' });
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'healthy' });
// });

// // Routes
// app.use("/api/movies", movieRouter);
// app.use("/api/actors", actorRouter);
// app.use("/api/producers", producerRouter);

// // MongoDB Connection URI
// const MONGO_URI = "mongodb+srv://jayachandran:jc@3747@jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // MongoDB connection function with retries
// const connectDB = async (retries = 5) => {
//   while (retries) {
//     try {
//       await mongoose.connect(MONGO_URI, {
//         serverSelectionTimeoutMS: 10000,
//         connectTimeoutMS: 20000,
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

// const PORT = process.env.PORT || 5000;

// // Server startup function
// const startServer = async () => {
//   try {
//     const isConnected = await connectDB();
//     if (!isConnected) {
//       console.error("Failed to connect to MongoDB. Server will not start.");
//       process.exit(1);
//     }
    
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`App is listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// };

// startServer();
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const producerRouter = require("./routes/producer");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://34.93.14.21:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Fixed: Added quotes around all methods
  credentials: true
}));

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'IMDB API Server Running' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Routes
app.use("/api/movies", movieRouter);
app.use("/api/actors", actorRouter);
app.use("/api/producers", producerRouter);

// MongoDB Connection URI - Move this to .env file
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jayachandran:jc@3747@jai@cluster0.w45he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection function with retries
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 20000,
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

const PORT = process.env.PORT || 5000;

// Server startup function
const startServer = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error("Failed to connect to MongoDB. Server will not start.");
      process.exit(1);
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
