import express from "express";
const router = express.Router();
import { authorization } from "../middleware/auth.middleware.js";
import { getAllMessagesForChat, sendMessage } from "../controllers/message.controller.js";

router.route('/:chatId').get(authorization, getAllMessagesForChat).post(authorization, sendMessage);

export default router;