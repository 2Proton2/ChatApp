import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import mongoose from "mongoose";
import { emitSocketEvent } from "../socket/index.js";
import { ChatEventEnum } from "../constants.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!chatId || !content) throw new ApiError(400, "Invalid data passed into the request", []);

    let chatMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    }

    try {
        let chatMessageInstance = await Message.create(chatMessage);

        let fullChatMessage = await Message.find({
            _id: chatMessageInstance._id
        })
            .populate("sender", "-password")
            .populate("chat");

        fullChatMessage = await User.populate(fullChatMessage, {
            path: "chat.users",
            select: "name pic email",
        });

        fullChatMessage[0].chat.users.forEach((person) => {
            // here the chat is the raw instance of the chat in which participants is the array of object ids of users
            // avoid emitting event to the user who is sending the message
            if(person._id === req.user._id) return

            emitSocketEvent(req, person._id, ChatEventEnum.MESSAGE_RECEIVED_EVENT, fullChatMessage);
        })

        await Chat.findOneAndUpdate({ _id: chatId }, { latestMessage: new mongoose.Types.ObjectId(JSON.stringify(fullChatMessage._id)) });

        res.status(201).json(new ApiResponse(201, fullChatMessage, "Message Received"));
    } catch (error) {
        throw new ApiError(400, error?.message, [])
    }
});

export const getAllMessagesForChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    const allChatMessages = await Message.find({
        chat: chatId
    })
    .populate("sender", "-password")
    .populate("chat");

    res.status(200).json(new ApiResponse(200, allChatMessages, "Fetched all chat messages"));

});