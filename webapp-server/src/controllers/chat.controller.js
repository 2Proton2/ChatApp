import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const accessAndCreateChat = asyncHandler(async (req, res) => {
    const { userId } = req.body; //frontend will send id which user is being selected for chatting

    if (!userId) {
        throw new ApiError(400, "UserId param not sent with request", []);
    }

    //find the chat exists or not .... if not then create new chat
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password") //populating the users as reference is indicated
        .populate("latestMessage"); // then populating the latest message

    //lastestMessage also consists of the sender Id which is again a userId
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.status(200).json(new ApiResponse(200, isChat, "Chat fetched"));
    }
    else {
        const newChat = {
            chatName: "sender",
            isGroupChat: false,
            users: [
                req.user._id,
                userId
            ]
        }

        try {
            const newChatInstance = await Chat.create(newChat);
            const fullChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
            res.status(201).json(new ApiResponse(201, fullChat, "New Chat Created"));
        } catch (error) {
            throw new ApiError(400, error?.message, []);
        }
    }
});

export const fetchAllChats = asyncHandler(async (req, res) => {
    let allChats = await Chat.find({
        users: { $elemMatch: {$eq: req.user._id} }
    })
    .populate("users", "name pic email")
    .populate("latestMessage")
    .populate("groupAdmin", "-password")
    .sort({updatedAt: -1});

    allChats = await User.populate(allChats, {
        path: "latestMessage.sender",
        select: "email name pic"
    });

    res.status(200).json(new ApiResponse(200, allChats, "Fetched all chats"))
})