// // const express = require("express");
// // const mongoose = require("mongoose")
// // require('dotenv').config()
// // const movieRouter = require("./routes/movie")
// // const actorRouter = require("./routes/actor")
// // const producerRouter = require("./routes/producer")
// // const cors = require("cors")

// // mongoose.set("strictQuery", false);

// // mongoose.connect(process.env.MONGO_URL).then(()=>{
// //     console.log("DB connected successfully");
// // }).catch((err) => {
// //     console.log(err);
// // })

// // const app = express();

// // app.use(express.json());
// // app.use(cors());
// // app.use("/movies",movieRouter)
// // app.use("/actors",actorRouter)
// // app.use("/producers",producerRouter)

// // app.listen(process.env.PORT,()=>{
// //     console.log(`App is listening on port ${process.env.PORT}`)
// // })
// const express = require("express");
// const mongoose = require("mongoose")
// require('dotenv').config()
// const movieRouter = require("./routes/movie")
// const actorRouter = require("./routes/actor")
// const producerRouter = require("./routes/producer")
// const cors = require("cors")

// mongoose.set("strictQuery", false);

// // Add health check endpoint
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'healthy' });
// });

// // Add error handling for MongoDB connection
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("DB connected successfully");
//     } catch (err) {
//         console.error("MongoDB connection error:", err);
//         process.exit(1);
//     }
// };

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/movies", movieRouter)
// app.use("/actors", actorRouter)
// app.use("/producers", producerRouter)

// // Connect to MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`App is listening on port ${PORT}`)
// });
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const movieRouter = require("./routes/movie");
const actorRouter = require("./routes/actor");
const producerRouter = require("./routes/producer");
const cors = require("cors");

mongoose.set("strictQuery", false);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Routes
app.use("/movies", movieRouter);
app.use("/actors", actorRouter);
app.use("/producers", producerRouter);

// MongoDB connection with retry logic
const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            });
            console.log("DB connected successfully");
            return;
        } catch (err) {
            console.error("MongoDB connection error:", err);
            retries -= 1;
            if (retries === 0) {
                process.exit(1);
            }
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log(`Retrying connection... (${retries} attempts remaining)`);
        }
    }
};

const PORT = process.env.PORT || 5000;

// Start server only after attempting DB connection
const startServer = async () => {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`App is listening on port ${PORT}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
