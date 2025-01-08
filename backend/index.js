require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Import the CORS library
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");

(async () => {
    await mongoDB();// Ensure DB is initialized before starting the server

    // Use CORS middleware
    app.use(cors({
        origin: 'http://localhost:3000', // Allow requests from your frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true // Allow credentials if needed
    }));

    // Parse JSON request bodies
    app.use(express.json());

    // Define your routes
    app.use('/api', require("./Routes/CreateUser"));
    app.use('/api', require("./Routes/DisplayData"));
    app.use('/api', require("./Routes/OrderData"));

    // Root route
    app.get('/', (req, res) => {
        res.send("Hello world");
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})();
