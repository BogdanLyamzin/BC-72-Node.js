import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

import {emailRegexp} from "../constants/user-constants.js";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username must be exist"],
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateOptions);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;