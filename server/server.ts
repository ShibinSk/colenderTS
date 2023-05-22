import bodyParser from "body-parser";
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/calenderRoutes");

const app = express();

app.use(bodyParser())
const PORT :number=parseInt(process.env.PORT || "5000", 10);


app.use(express.json());
app.use(cors());


mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>  console.log("Mongodb Connected..."))

// Routes
app.use(routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));