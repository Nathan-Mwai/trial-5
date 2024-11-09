import VerificationCodeType from "../constants/verificationCodeType";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneDayFromNow } from "../utils/date";

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

    

    // sign access token & refresh token
    // return user & tokens
}