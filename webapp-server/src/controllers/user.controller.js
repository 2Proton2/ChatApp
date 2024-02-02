import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"

export const userRegistration = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        new ApiError(400, "Please Enter all the Feilds", []);
    }

    const userExists = await User.findOne({
        email
    });

    if (userExists) {
        new ApiError(409, "User with email or username already exists", []);
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json(
            new ApiResponse(
                201,
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    pic: user.pic,
                    token: await user.generateAccessToken(user._id)
                },
                "User logged in successfully"
            )
        );
    } else {
        new ApiError(400, "User not found", [])
    }
});