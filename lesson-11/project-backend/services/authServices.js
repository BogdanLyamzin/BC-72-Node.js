import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

import sendEmail from "../helpers/sendEmail.js";

const {BASE_URL} = process.env;

const createVerifyEmail = ({email, verificationCode}) => ({
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
});

export const findUser = filter => User.findOne(filter);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const signup = async data => {
    const {email, password} = data;
    const user = await findUser({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    const newUser = await User.create({...data, password: hashPassword, verificationCode});

    const verifyEmail = createVerifyEmail({email, verificationCode});

    await sendEmail(verifyEmail);

    return newUser;
}

export const verifyUser = async verificationCode => {
    const user = await findUser({verificationCode});
    if(!user) {
        throw HttpError(404, "User not found");
    }

    await updateUser({_id: user._id}, {verify: true, verificationCode: null});
}

export const resendVerifyEmail = async email => {
    const user = await findUser({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }
    if(user.verify) {
        throw HttpError(400, "Email already verify");
    }

    const verifyEmail = createVerifyEmail({email, verificationCode: user.verificationCode});

    await sendEmail(verifyEmail);
}

export const signin = async data => {
    const {email, password} = data;
    const user = await findUser({email});
    if(!user) {
        throw HttpError(401, "Email not found");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Password invalid");
    }

    const payload = {
        id: user._id,
    };

    const token = createToken(payload);
    await updateUser({_id: user._id}, {token});
    
    return {token};
}