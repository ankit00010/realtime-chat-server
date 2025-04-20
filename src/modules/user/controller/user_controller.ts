import { Request, Response } from "express";
import ThrowError from "../../../middlewares/error";
import UserRepository from "../repository/user_repository";
import AuthRepository from "../../auth/repository/auth_repository";

class UserController {




    static async addFriend(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.authUser?.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired"
                });
            }


            const { username } = req.body;


            if (!username) {
                return res.status(400).json({ success: false, message: "Username is required" });
            }
            await AuthRepository.isUserExists(username);


            const user = await UserRepository.sendRequest(username, userId);

            if (!user) {
                throw new ThrowError(500, "FAILURE", "Failed to send the request");
            }


            return res.status(200).json({ success: false, message: "Request sended!" });


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


export default UserController;