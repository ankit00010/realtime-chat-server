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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.initializeMongo = void 0;
const mongodb_1 = require("mongodb");
let client;
function initializeMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mongoURI = process.env.MONGO_URI || "";
            client = new mongodb_1.MongoClient(mongoURI);
            yield client.connect();
            console.log("Connected to the MongoDB database");
        }
        catch (error) {
            console.error("Error connecting to the database:", error);
        }
    });
}
exports.initializeMongo = initializeMongo;
function getClient() {
    return client;
}
exports.getClient = getClient;
