const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const Users = require('../users/userModel')

router.post('/register', validateUser, (req, res) => {
    const userInfo = req.body
    const rounds = process.env.BCRYPT_ROUND || 4
    const hash = bcrypt.hashSync(userInfo.password, rounds)
    userInfo.password = hash

    Users.add(userInfo)
    .then(newUser => {
        console.log(newUser)
        res.status(201).json({ data: newUser })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message})
    })
   
})

router.post('/login', validateUser, (req, res) => {
    const credentials = req.body

    Users.getBy({ username: credentials.username })
    .then(([user]) => {
        console.log(user)
        if(user && bcrypt.compareSync(credentials.password, user.password)) {
            req.session.username = user.username
            res.status(201).json({ message: `${credentials.username} logged in` })
        } else {
            res.status(401).json({ message: 'you shall not pass' })
        }
    })
    .catch(err => {
        console.log(error)
        res.status(500).json({ message: err.message })

    })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ message: `error loggin out ${err.message}` })
            } else {
                res.status(200).json({ message: 'logged out'})
            } 
        })
    } else {
        res.status(204).end()
    }
})

function validateUser(req, res, next) {
    const { username, password } = req.body
    if(username && password) {
        next()
    } else {
        res.status(400).json({ message: 'invalid info, provide a username and password' })
    }
}

// function validateCredentials(req, res, next) {
//     const {username, password } = req.body 
//     if(username)

// }

module.exports = router

