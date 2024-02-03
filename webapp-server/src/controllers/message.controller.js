import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import mongoose from "mongoose";

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

        await Chat.findOneAndUpdate({ _id: chatId }, { latestMessage: new mongoose.Types.ObjectId(JSON.stringify(fullChatMessage._id)) });

        res.status(201).json(new ApiResponse(201, fullChatMessage, "Message Received"));
    } catch (error) {
        throw new ApiError(400, error?.message, [])
    }
});

export const getAllMessagesForChat = asyncHandler();