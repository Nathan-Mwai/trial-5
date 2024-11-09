export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent: string;
}
export const createAccount = async (data:CreateAccountParams) => {
    // verify user doesnt exit
    // create user
    // create verification code
    // create session
    // sign access token & refresh token
    // return user & tokens
}