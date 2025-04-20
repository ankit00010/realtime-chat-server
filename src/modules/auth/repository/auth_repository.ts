import { Profile } from "passport";
import { UserModel } from "../models/auth_models";
import { client } from "../../../config/database";
import ThrowError from "../../../middlewares/error";
import Utils from "../../../utils/chatbot_utils";


class AuthRepository {




    static async isUserExists(
        email?: string,
        username?: string
    ): Promise<any> {

        let query;
        if (email) {
            query = { email };
        }
        else {
            query = { username };
        }
        
        const db = client.db("master");

        let user = await db.collection("user_data").findOne(query);

        if (!user) {
            throw new ThrowError(404, "NOT_FOUND", "User Does not exists")
        }
        return user;

    }



    static async createUserData(name: string, email: string, username: string, password: string): Promise<any> {
        const db = await client.db("master");



        const user: any = await db.collection("user_data").findOne({ email });
        const totalUsers = await db.collection("user_data").countDocuments({});
        const user_id = Utils.generateDocumentId(totalUsers);


        if (user) {
            throw new ThrowError(500, "USER_EXISTS", "User already exists")
        }
        let result = await db.collection("user_data").insertOne({
            user_id: user_id,
            name,
            email,
            password,
            username,
            googleID: null,
            profilePicture: null,
            createdAt: new Date()
        });

        if (!result.acknowledged) {
            throw new ThrowError(500, "FAILURE", "Something went wrong while registering the user");
        }
        console.log("✅ User created successfully:", user);
        return user;
    }



    static async handleGoogleCheck(profile: Profile): Promise<any> {
        const email = profile.emails?.[0]?.value;



        const db = client.db("master");



        const user: any = await db.collection("user_data").findOne({ email });
        const totalUsers = await db.collection("user_data").countDocuments({});

        const user_id = Utils.generateDocumentId(totalUsers);

        let result;
        if (!user) {
            result = await db.collection("user_data").insertOne({
                id: user_id,
                name: profile.displayName,
                email: profile.emails?.[0].value,
                password: null,
                googleID: profile.id,
                username: "",
                profilePicture: profile.photos?.[0]?.value,
                createdAt: new Date()
            });
            if (!result.acknowledged) {
                throw new ThrowError(500, "FAILURE", "Failed User Login");
            }
        }

        console.log("This is the result", result);

        const userData = {
            email: email,
            id: user_id,
            isUser: true
        }
        return userData;

    }




}


export default AuthRepository;