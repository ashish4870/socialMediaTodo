const JWT = require('jsonwebtoken');
const client = require('../utils/redis/redis-utils')
const User = require('../dbModels/user')
const checkUserPresence = async (Object) => {
    const { email } = Object
    let user, msg, code
    if (email) {
        user = await User.findOne({ email: email }, { _id: 1 })
        if (!user) {
            user = new User({ email })
            user = await user.save()
            msg = 'User created successfully'
            code = '201'
        } else if (user) {
            user = await User.findOneAndUpdateOne({ _id: user._id }, { new: true })
            msg = 'User activated successfully'
            code = '200'
        } else {
            msg = 'User fetched successfully'
            code = '200'
        }
    }
    return { userId: user._id.toString(), message: msg, code }
}
const verifyOtp = async (userId, otp) => {
    const savedOtp = await client.getKey(userId.toString() + '-otp')
    if (savedOtp) {
        if (otp === savedOtp) {
            return { otpMatch: true, message: 'OTP verified successfully' }
        }
        else return { otpMatch: false, message: 'OTP invalid' }
    }
    return { expired: true, message: 'OTP expired' }
}
const generateJwtToken = async (userId) => {
    const token = JWT.sign({ userId }, process.env.JWT_SECRET)
    await client.setKey(userId + '-token', token)
    await client.setRedisKeyExpiry(userId + '-token', 10000)
    await client.setKey(token, userId)
    await client.setRedisKeyExpiry(token, 10000)
    return token
}
const checkAndExpireOLdToken = async (userId) => {
    const token = await client.getKey(userId + '-token')
    if (token) {
        await client.DEL(userId + '-token')
        await client.DEL(token)
    }
    return
}
module.exports = {
    checkUserPresence,
    verifyOtp,
    generateJwtToken,
    checkAndExpireOLdToken
};
