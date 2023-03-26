const userService = require('../services/userService')
const client = require('../utils/redis/redis-utils')
const User = require('../dbModels/user')
const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const mailService = require('../services/mailService')
const signIn = async (req, res) => {
    try {
        const { email } = req.body
        const { userId, message, code } = await userService.checkUserPresence ({ email })
        const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        console.log(randomNum);
        await mailService.sendEmailOtp({otp: randomNum, userEmail: email})
        await userService.checkAndExpireOLdToken(userId)
        await client.setKey(userId.toString()+'-otp', randomNum.toString())
        await client.setRedisKeyExpiry(userId+'-otp', 1000000000000)
        //send mail
        return successResponse ({res, code, data: { userId }, message})
    } catch (error) {
        console.log(error)
        return errorResponse({res, error})
    }
}
const verifySignIn = async (req, res) => {
    try {
        const { userId, otp } = req.body
        const { otpMatch, message, expired } = await userService.verifyOtp(userId, otp)
        if(otpMatch){
            await userService.checkAndExpireOLdToken(userId)
            const token = await userService.generateJwtToken(userId)
            return successResponse ({res, code: 200, data: { userId, token }, message: 'Success'})
        } else if (expired) {
            return errorResponse ({res, code: 401, message})
        }
        return errorResponse ({res, code: 401, message})

    } catch (error) {
        return errorResponse ({res, error})
    }
}
const getUser = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findOne({_id: userId})
        return successResponse ({res, data: { user }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findOneAndUpdate({_id: userId}, req.body, { new: true })
        return successResponse ({res, data: { user }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}
module.exports = {
    signIn,
    verifySignIn,
    getUser,
    updateUser
}