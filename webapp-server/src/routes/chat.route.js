import express from "express";
const router = express.Router();
import { authorization } from "../middleware/auth.middleware.js";
import { accessAndCreateChat, fetchAllChats } from "../controllers/chat.controller.js";


/**
 * @swagger
 * /api/chat :
 *   post:
 *     security:
 *       - bearerAuth:
 *           - 'read:users'
 *           - 'public'
 *     tags: [Chat]
 *     requestBody:
 *       description: Access the chat if it created. If not then create a new chat
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                  type: string
 *                  required: true
 *     responses:
 *       '200':
 *         description: Successfully accessed/created chat
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




/**
 * @swagger
 * /api/chat :
 *   get:
 *     security:
 *       - bearerAuth:
 *           - 'read:users'
 *           - 'public'
 *     tags: [Chat]
 *     requestBody:
 *       description: fetch all the chats that are being created for a logged in user
 *     responses:
 *       '200':
 *         description: Successfully fetched the chats
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
router.route('/').post(authorization, accessAndCreateChat).get(authorization, fetchAllChats)

export default router;