import { client } from "../../../config/database";
import ThrowError from "../../../middlewares/error";
import { UserModel } from "../../auth/models/auth_models";
import { ChatRequestModel } from "../models/user_model";

class UserRepository {


    static async sendRequest(username: string, sender_id: string): Promise<boolean> {

        const db = client.db("master");

        const user = await db.collection<UserModel>("user_data").findOne({ username });


        if (!user) {
            throw new ThrowError(404, "NOT_FOUND", "User doesnot exists");
        }

        const sendRequest = await db.collection<ChatRequestModel>("user_requests").insertOne({
            fromUserId: sender_id,
            toUserId: user.user_id,
            status: "pending",
            createdAt: new Date()
        })


        if (!sendRequest.acknowledged) {
           return false;
        }


        return true;



    }




}




export default UserRepository;