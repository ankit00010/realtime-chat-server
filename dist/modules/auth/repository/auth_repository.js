"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../config/database");
const error_1 = __importDefault(require("../../../middlewares/error"));
const chatbot_utils_1 = __importDefault(require("../../../utils/chatbot_utils"));
class AuthRepository {
    static isUserExists(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let query;
            if (email) {
                query = { email };
            }
            else {
                query = { username };
            }
            const db = database_1.client.db("master");
            let user = yield db.collection("user_data").findOne(query);
            if (!user) {
                throw new error_1.default(404, "NOT_FOUND", "User Does not exists");
            }
            return user;
        });
    }
    static createUserData(name, email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.client.db("master");
            const user = yield db.collection("user_data").findOne({ email });
            const totalUsers = yield db.collection("user_data").countDocuments({});
            const user_id = chatbot_utils_1.default.generateDocumentId(totalUsers);
            if (user) {
                throw new error_1.default(500, "USER_EXISTS", "User already exists");
            }
            let result = yield db.collection("user_data").insertOne({
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
                throw new error_1.default(500, "FAILURE", "Something went wrong while registering the user");
            }
            console.log("✅ User created successfully:", user);
            return user;
        });
    }
    static handleGoogleCheck(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
            const db = database_1.client.db("master");
            const user = yield db.collection("user_data").findOne({ email });
            const totalUsers = yield db.collection("user_data").countDocuments({});
            const user_id = chatbot_utils_1.default.generateDocumentId(totalUsers);
            let result;
            if (!user) {
                result = yield db.collection("user_data").insertOne({
                    id: user_id,
                    name: profile.displayName,
                    email: (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0].value,
                    password: null,
                    googleID: profile.id,
                    username: "",
                    profilePicture: (_e = (_d = profile.photos) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.value,
                    createdAt: new Date()
                });
                if (!result.acknowledged) {
                    throw new error_1.default(500, "FAILURE", "Failed User Login");
                }
            }
            console.log("This is the result", result);
            const userData = {
                email: email,
                id: user_id,
                isUser: true
            };
            return userData;
        });
    }
}
exports.default = AuthRepository;
