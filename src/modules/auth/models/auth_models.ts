export interface UserModel {
    user_id: string;
    name: string;
    email: string;
    username:string;
    googleID?: string | null;
    profilePicture?: string | null;
    password?: string | null;
    createdAt: Date;
}




