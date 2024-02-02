import express from "express";
import { userRegistration, fetchSearchedUser, userLogin } from "../controllers/user.controller.js";
import { authorization } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/login', userLogin);
router.route('/').post(userRegistration).get(authorization, fetchSearchedUser);

export default router;