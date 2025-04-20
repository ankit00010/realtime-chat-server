"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkTokenExpiry_1 = require("../../../middlewares/checkTokenExpiry ");
const user_controller_1 = __importDefault(require("../controller/user_controller"));
const user_router = (0, express_1.Router)();
user_router.use(checkTokenExpiry_1.AuthMiddleware.authenticateToken);
user_router.use(checkTokenExpiry_1.AuthMiddleware.isUser);
user_router.post("/addFriend", user_controller_1.default.addFriend);
exports.default = user_router;
