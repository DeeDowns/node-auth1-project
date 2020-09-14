const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

// const userRouter = require('../users/userRouter')
// const authRouter = require('../auth/authRouter')
const dbConnection = require('../data/db-config')

const server = express()

const sessionConfig = {
    name: 'bubby',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60, //1 hour
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConnection,
        table: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

// server.use('')

server.get('/', (req,res) => {
    const password = req.headers.password
    const rounds = process.env.BCRYPT_ROUND || 4
    const hash = bcrypt.hashSync(password, rounds)
    res.json({ 
        api: 'up',
        password, hash
    })
})

function protected(req, res, next) {
    if(req.session.username) {
        next()
    } else {
        res.status(401).json({ message: 'you shall not pass' })
    }
}

module.exports = server