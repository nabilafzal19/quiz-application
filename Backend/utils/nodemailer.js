const nodemailer = require('nodemailer')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendMail = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(400).send("user with this email doesn't exits")
        const token = jwt.sign({ email }, 'quiz', { expiresIn: '5m' })
        const link = `${process.env.CLIENT_BASE_URL}/reset-password?token=${token}`
        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${link}`
        };


        const result = await mailTransporter.sendMail(mailOptions)
        // console.log(result)
        res.json({ message: "mail sent succefully!", status: 200 })
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMail
