import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authorization = asyncHandler(async (req, res, next) => {
    if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        throw new ApiError(401, "Not authorized, token failed", []);
    }
    else {
        const clientToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(clientToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }
})