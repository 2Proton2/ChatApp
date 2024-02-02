import express from "express";
import { userRegistration, fetchSearchedUser } from "../controllers/user.controller.js";
import { authorization } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route('/').post(userRegistration).get(authorization, fetchSearchedUser);

export default router;