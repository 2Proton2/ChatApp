import express from "express";
import { userRegistration, fetchSearchedUser, userLogin } from "../controllers/user.controller.js";
import { authorization } from "../middleware/auth.middleware.js";
const router = express.Router();

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       description: Log user in
 *       required: true
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
 *      tags: [Users]
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
 *       - in: headers
 *         name: "Authorization"
 *         schema:
 *           type: string
 *         description: Bearer JWT token
 *     summary: fetch user
 *     security:
 *       - BearerAuth: []  # Reference to the security definition
 *     tags: [Users]
 *
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
 */
router.route('/').post(userRegistration).get(authorization, fetchSearchedUser);

export default router;