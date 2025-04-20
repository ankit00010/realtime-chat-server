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
class UserRepository {
    static sendRequest(username, sender_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = database_1.client.db("master");
            const user = yield db.collection("user_data").findOne({ username });
            if (!user) {
                throw new error_1.default(404, "NOT_FOUND", "User doesnot exists");
            }
            const sendRequest = yield db.collection("user_requests").insertOne({
                fromUserId: sender_id,
                toUserId: user.user_id,
                status: "pending",
                createdAt: new Date()
            });
            if (!sendRequest.acknowledged) {
                return false;
            }
            return true;
        });
    }
}
exports.default = UserRepository;
