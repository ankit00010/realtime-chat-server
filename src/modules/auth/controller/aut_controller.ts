import { Request, Response } from "express";
import AuthRepository from "../repository/auth_repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ThrowError from "../../../middlewares/error";

class AuthController {



    static async RegisterUser(
        req: Request,
        res: Response
    ): Promise<any> {
        try {

            const { name, username, email, password } = req.body;



            if (!name || !email || !password || !username) {
                throw new ThrowError(400, "VALIDATION ERROR", "Invalid Fields")
            }







            const saltRounds = 10

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await AuthRepository.createUserData(name, email, username, hashedPassword);


            return res.status(200).json({ code: 200, title: "SUCCESS", message: "Success! Your account is ready to go." });

        } catch (error) {
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }








    static async loginUser(req: Request, res: Response): Promise<any> {
        try {
            const { username, email, password } = req.body;

            // Ensure both fields are provided
            if ((!email && !username) || !password) {
                throw new ThrowError(400, "VALIDATION_ERROR", "All Fields are required");
            }

            // Check if user exists
            const userData = await AuthRepository.isUserExists(email,username);
            if (!userData) {
                throw new ThrowError(404, "NOT_FOUND", "User does not exist");
            }

            // Ensure password exists in userData
            if (!userData.password) {
                throw new ThrowError(500, "SERVER_ERROR", "User password is missing in the database");
            }

            console.log(userData.id);


            // Verify password
            const verifyUser = await bcrypt.compare(password, userData.password);
            if (!verifyUser) {
                throw new ThrowError(401, "UNAUTHORIZED", "Invalid Email or Password");
            }
            const SECRET_KEY = process.env.JWT_SECRET || ""; // Use env for security
            const EXPIRES_IN = "1d"; // Token expiration time
            const payload = {
                userId: userData.id,
                isUser: true, // or false
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
            return res.status(200).json({
                code: 200,
                title: "SUCCESS",
                message: "Login Successfull!",
                token
            });

        } catch (error) {
            if (error instanceof ThrowError) {
                return res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                return res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                return res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }





    static async handleGoogleLoginSuccess(req: Request, res: Response): Promise<void> {
        try {

            const { user, token } = req.user as any;

            console.log("Token check", token);
            console.log("User check", user);

            if (user && token) {

                return res.status(200).redirect(`${process.env.CLIENT_URL}/verify-user?token=${token}`);
            } else {
                res.status(400).send('Authentication failed');
            }
        } catch (error) {
            // Handle known errors thrown within the application
            if (error instanceof ThrowError) {
                res.status(error.code).json({
                    code: error.code,
                    title: error.title,
                    message: error.message,
                });
            } else if (error instanceof Error) {
                // Handle unexpected errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: error.message,
                });
            } else {
                // Handle unknown errors
                res.status(500).json({
                    code: 500,
                    title: "Internal Server Error",
                    message: "An unknown error occurred",
                });
            }
        }
    }









}


export default AuthController;