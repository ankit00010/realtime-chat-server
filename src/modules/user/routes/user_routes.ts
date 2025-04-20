import { Router } from "express";
import { AuthMiddleware } from "../../../middlewares/checkTokenExpiry ";
import UserController from "../controller/user_controller";



const user_router = Router();

user_router.use(AuthMiddleware.authenticateToken);
user_router.use(AuthMiddleware.isUser);

user_router.post("/addFriend",UserController.addFriend)


export default user_router;