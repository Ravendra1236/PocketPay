const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Connect to the database
mongoose
    .connect(process.env.MONGO_URL, {

    })
    .then(() => {
    console.log("Database connected successfully!");
    })
    .catch((error) => {
    console.error("Error connecting to the database:", error);
    });
