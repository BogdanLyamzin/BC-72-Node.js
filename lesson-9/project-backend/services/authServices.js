import bcrypt from "bcrypt";

import User from "../models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

export const findUser = filter => User.findOne(filter);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const signup = async data => {
    const {email, password} = data;
    const user = await findUser({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return User.create({...data, password: hashPassword});
}

export const signin = async data => {
    const {email, password} = data;
    const user = await findUser({email});
    if(!user) {
        throw HttpError(401, "Email not found");
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