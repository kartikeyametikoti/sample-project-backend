const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config()
const movieRouter = require("./routes/movie")
const actorRouter = require("./routes/actor")
const producerRouter = require("./routes/producer")
const cors = require("cors")

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use(express.json());
app.use(cors());
app.use("/movies",movieRouter)
app.use("/actors",actorRouter)
app.use("/producers",producerRouter)

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`)
})