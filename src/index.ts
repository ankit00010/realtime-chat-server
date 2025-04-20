// Import core and third-party dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import passport from "passport";

// Import custom modules and configurations
import { initializeMongo } from "./config/database";
import { initializePassport } from "./config/passport";
import auth_router from "./modules/auth/routes/auth_routes";
import user_router from "./modules/user/routes/user_routes";
import { const_routes } from "./constants/const_routes";
import SocketService from "./services/socket";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Create HTTP server instance to attach Socket.IO
const server = http.createServer(app);

// Define server port
const port = process.env.PORT || 8000;

// Create a new socket service instance
const socketService = new SocketService();
socketService.io.attach(server);

// Configure CORS options
const corsOptions = {
  origin: '*',
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Initialize MongoDB connection
initializeMongo();

// Initialize and configure Passport for authentication
app.use(passport.initialize());
initializePassport();

// Define base routes
app.use(const_routes); // Global or static routes
app.use('/api/auth', auth_router); // Authentication routes
app.use('/api/user', user_router); // User-related routes

socketService.initListners();

// Start the server
server.listen(port, () => {
  console.log(
    `Server running on port ${port} and URL http://localhost:${port}/`
  );
});
