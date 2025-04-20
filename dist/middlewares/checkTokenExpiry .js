"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.SECRET_KEY = process.env.JWT_SECRET || "";
// Middleware to authenticate token
AuthMiddleware.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, AuthMiddleware.SECRET_KEY);
        console.log("Decoded value", decoded);
        const payload = decoded;
        req.authUser = {
            userId: payload.userId,
            isUser: payload.isUser,
            token
        };
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired"
            });
        }
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        });
    }
};
// Middleware to check if user is a valid user
AuthMiddleware.isUser = (req, res, next) => {
    var _a;
    // Use our new property name
    if (!((_a = req.authUser) === null || _a === void 0 ? void 0 : _a.userId)) {
        res.status(403).json({
            success: false,
            message: "Access denied."
        });
        return;
    }
    next();
};
