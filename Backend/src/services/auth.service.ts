import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import VerificationCodeType from "../constants/verificationCodeType";
import sessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneDayFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent: string;
}
export const createAccount = async (data:CreateAccountParams) => {
    // verify user doesnt exit
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    if(existingUser){
        throw new Error("User already exists")
    }
    // create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });
    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneDayFromNow()
    })
    // send verification code

    // create session

    const session = sessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    
    })
    // sign access token & refresh token

    const refreshToken = jwt.sign(
        {sessionId: (await session)._id},
        JWT_REFRESH_SECRET,{
            audience:['user'], // can be user or admin
            expiresIn: "30d",
        }
    )

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: (await session)._id},
        JWT_SECRET,
        {
            audience:['user'], // can be user or admin
            expiresIn: "15m",
        }
    )
    // return user & tokens
    return {
        user,
        accessToken,
        refreshToken
    }
}