import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async(req, res)=> {
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    await authServices.verifyUser(verificationCode);

    res.json({
        message: "Email verified successfully"
    })
}

const resendVerify = async(req, res)=> {
    const {email} = req.body;
    await authServices.resendVerifyEmail(email);

    res.json({
        message: "Verify email send again"
    })
}

const signin = async(req, res)=> {
    const {token} = await authServices.signin(req.body);

    res.json({
        token,
    })
}

const getCurrent = (req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    });
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await authServices.updateUser({_id}, {token: ""});

    res.json({
        message: "Logout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    resendVerify: ctrlWrapper(resendVerify),
    verify: ctrlWrapper(verify),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}