const express = require('express')
const { sequelize, connection } = require('./utils/db')
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
connection()


app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const payload = {
        email,
        password: hash
    }
    await User.create(payload)
    res.send('signup ')
})

app.post('/login', async (req, res) => {
    console.log('api hittin')
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) return new Error("incorrect password!")
    const token = await jwt.sign({ email: email }, 'mcq')
    res.json({ message: 'successful login', user, token })
})
app.listen(5011, () => {
    console.log('app is running on port 5011')
})