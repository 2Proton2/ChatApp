import express from "express";
import { userRegistration, fetchSearchedUser, userLogin } from "../controllers/user.controller.js";
import { authorization } from "../middleware/auth.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       description: Log user in
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  required: true
 *               password:
 *                  type: string
 *                  required: true
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  statusCode:
 *                      type: integer
 *                  data:
 *                      type: object
 *                  message:
 *                      type: string
 *                  success:
 *                      type: boolean
 *                      default: true
 *       '404':
 *          description: Bad request
 *          
 *       '500':
 *         description: Internal server error
 *         
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Registration
 *     tags: [Users]
 *     requestBody:
 *       description: User registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  required: true
 *               pic:
 *                  type: string
 *               password:
 *                  type: string
 *                  required: true
 *               name:
 *                  type: string
 *                  required: string
 *               
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  statusCode:
 *                      type: integer
 *                  data:
 *                      type: object
 *                  message:
 *                      type: string
 *                  success:
 *                      type: boolean
 *                      default: true
 *       '404':
 *          description: Bad request
 *          
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           description: name of the user
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *           description: email of the user
 *     security:
 *       - bearerAuth:
 *           - 'read:users'
 *           - 'public'
 *     tags: [Users]
 *     requestBody:
 *       description: fetch all the user or mentioned in the query of the URL
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                   default: true
 *       '404':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * 
 * components:
 *       securitySchemes:
 *           bearerAuth:
 *               type: http
 *               scheme: bearer
 *               bearerFormat: jwt
 *               description: 'note: non-oauth scopes are not defined at the securityScheme level'
 */
router.route('/').post(userRegistration).get(authorization, fetchSearchedUser);

export default router;