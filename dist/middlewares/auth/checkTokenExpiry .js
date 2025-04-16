"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware function to validate JWT token from Authorization header.
 * If the token is valid, it extracts the userID and attaches it to the request object.
 * @param req Express Request object
 * @param res Express Response object
 * @param next NextFunction to proceed to the next middleware or route
 */
const validateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        // Return error response if token is missing
        return res.status(401).json({
            status: "FAILED",
            error: "Unauthorized Access",
        });
    }
    try {
        let decodedToken; // Type it properly if you know the structure of your token
        let userID; // Initialize userID as string or undefined
        const jwtSecret = process.env.JWT_SECRET || "";
        let email;
        // Verify the JWT token
        decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Log the decoded token for debugging
        console.log("Decoded token:", decodedToken);
        // Assuming your token payload has 'userID' field
        if (typeof decodedToken === 'object' && 'userID' in decodedToken) {
            userID = decodedToken.userID;
            email = decodedToken.email;
        }
        else {
            throw new Error('Invalid token payload');
        }
        // Attach the user ID to the request object for further use in the route
        req.userID = userID;
        req.email = email;
        // Proceed to the next middleware or route
        next();
        return; // Ensure a return statement here
    }
    catch (error) {
        // Log the error for debugging
        console.error("Error verifying token:", error);
        // Handle invalid tokens
        return res.status(401).json({
            status: "FAILED",
            error: "Unauthorized Access",
        });
    }
};
exports.validateToken = validateToken;
