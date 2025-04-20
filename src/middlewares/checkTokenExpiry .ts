import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Define our Auth User type with a different name to avoid conflicts
interface AuthUserData {
    userId: string;
    isUser: boolean;
    token: string;
}

// Extend Express Request with a differently named property
declare global {
    namespace Express {
        interface Request {
            authUser?: AuthUserData;
        }
    }
}

// Interface for JWT payload
interface JWTPayload {
    userId: string;
    isUser: boolean;
    token: string;
}

export class AuthMiddleware {
    private static readonly SECRET_KEY = process.env.JWT_SECRET || "";

    // Middleware to authenticate token
    static authenticateToken = (
        req: Request,
        res: Response,
        next: NextFunction
    ): any => {
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
            const decoded = jwt.verify(token, AuthMiddleware.SECRET_KEY);
            console.log("Decoded value", decoded);

            const payload = decoded as JWTPayload;
            req.authUser = {
                userId: payload.userId,
                isUser: payload.isUser,
                token
            };
            next();
        } catch (err: any) {
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
    static isUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        // Use our new property name
        if (!req.authUser?.userId) {
            res.status(403).json({
                success: false,
                message: "Access denied."
            });
            return;
        }

        next();
    };
}