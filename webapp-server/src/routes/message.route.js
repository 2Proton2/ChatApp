import express from "express";
const router = express.Router();
import { authorization } from "../middleware/auth.middleware.js";
import { getAllMessagesForChat, sendMessage } from "../controllers/message.controller.js";

/**
 * @swagger
 * /api/message/{chatId} :
 *   get:
 *     security:
 *       - bearerAuth:
 *           - 'read:users'
 *           - 'public'
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *           description: ChatId from the url params
 *     tags: [Messages]
 *     requestBody:
 *       description: fetch all the messages for the mentioned chatId in the url
 *     responses:
 *       '200':
 *         description: Successfully fetched messages
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
 * /api/message/{chatId} :
 *   post:
 *     security:
 *       - bearerAuth:
 *           - 'read:users'
 *           - 'public'
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *           description: ChatId from the url params
 *     tags: [Messages]
 *     requestBody:
 *       description: Send a new message on mentioned chatId
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                  type: string
 *                  required: true
 *     responses:
 *       '200':
 *         description: Message sent successfully
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
router.route('/:chatId').get(authorization, getAllMessagesForChat).post(authorization, sendMessage);

export default router;