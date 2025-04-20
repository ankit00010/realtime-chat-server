"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import core and third-party dependencies
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const passport_1 = __importDefault(require("passport"));
// Import custom modules and configurations
const database_1 = require("./config/database");
const passport_2 = require("./config/passport");
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth_routes"));
const user_routes_1 = __importDefault(require("./modules/user/routes/user_routes"));
const const_routes_1 = require("./constants/const_routes");
const socket_1 = __importDefault(require("./services/socket"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express application
const app = (0, express_1.default)();
// Create HTTP server instance to attach Socket.IO
const server = http_1.default.createServer(app);
// Define server port
const port = process.env.PORT || 8000;
// Create a new socket service instance
const socketService = new socket_1.default();
socketService.io.attach(server);
// Configure CORS options
const corsOptions = {
    origin: '*',
};
// Apply middleware
app.use((0, cors_1.default)(corsOptions)); // Enable CORS
app.use(express_1.default.json()); // Parse incoming JSON requests
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded data
// Initialize MongoDB connection
(0, database_1.initializeMongo)();
// Initialize and configure Passport for authentication
app.use(passport_1.default.initialize());
(0, passport_2.initializePassport)();
// Define base routes
app.use(const_routes_1.const_routes); // Global or static routes
app.use('/api/auth', auth_routes_1.default); // Authentication routes
app.use('/api/user', user_routes_1.default); // User-related routes
socketService.initListners();
// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port} and URL http://localhost:${port}/`);
});
