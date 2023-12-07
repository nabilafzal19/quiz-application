const express = require('express')
const { sequelize, connection } = require('./utils/db')
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const sendMail = require('./utils/nodemailer')
const app = express()
app.use(express.json())
app.use(cors())
connection()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verifyGoogleToken(token) {
    try {
        console.log("google client id", process.env.GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload()
        return payload

    } catch (error) {
        return { error: "Invalid user detected.please try again!" }
    }
}
app.patch('/reset-password', async (req, res) => {
    const { token, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    console.log('token decode', token)
    const decoded = jwt.verify(token, 'quiz')
    console.log(decoded)
    const email = decoded.email
    const user = await User.findOne({ where: { email } })
    if (!user) return res.send("user does not exists!")
    if (user.password === null) return res.send("password does not exists")
    const result = await user.update({ password: hash })

    return res.json({ message: "successfully updated password!", status: 200, result })
})
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const payload = {
        email,
        password: hash
    }
    await User.create(payload)
    res.send({ message: "signup successful", status: 200 })
})
app.post('/api/googleAuth', async (req, res) => {
    const { credential } = req.body
    const payload = await verifyGoogleToken(credential)
    console.log(payload)
})
app.post('/login', async (req, res) => {
    if (req.body?.credential) {
        const { credential } = req.body
        const payload = await verifyGoogleToken(credential)

        const userDetails = await User.findOne({ where: { email: (payload?.email) } })
        // console.log("userDetails", userDetails)
        if (payload) {
            // console.log("payload", (payload.email))
            if (!userDetails) {
                const user = await User.create({ email: payload.email })
                return res.json({ message: 'successful login', status: 200, user })
            }
            return res.json({ message: 'successful login', status: 200, userDetails })
        }
        return res.send({ message: 'error while login with google', status: 401 })
    }
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) return new Error("incorrect password!")
    const token = await jwt.sign({ email: email }, 'mcq')
    res.json({ message: 'successful login', user, token })
})

app.post('/forgot-password', (req, res) => {
    return sendMail(req, res)
})
app.listen(5011, () => {
    console.log('app is running on port 5011')
})