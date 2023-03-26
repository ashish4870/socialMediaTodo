const { EMAIL } = require('./constants');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.API_KEY);
const sendEmailOtp = async (args) => {
    try {
        const { otp, userEmail } = args;
        const body = EMAIL.BODY + otp;
        const message = {
            html: body,
            text: body,
            subject: EMAIL.SUBJECT,
            from: process.env.SENDER,
            to: userEmail,
            important: true,        
        }
        sgMail.send(message)
        .then((res) => {
            const response = {
                "sent": true,
                "error": false,
                "response": res
            }
            return response;
        })
        .catch((err) => {
          throw new Error(err);
        })
    } catch (e){
        return('Following error occured', e);
    }
};

module.exports = {
    sendEmailOtp
}

