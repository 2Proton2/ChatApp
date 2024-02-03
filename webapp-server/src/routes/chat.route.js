import express from "express";
const router = express.Router();
import { authorization } from "../middleware/auth.middleware.js";
import { accessAndCreateChat, fetchAllChats } from "../controllers/chat.controller.js";

router.route('/').post(authorization, accessAndCreateChat).get(authorization, fetchAllChats)

export default router;