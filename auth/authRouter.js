const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const Users = require('../users/userModel')

router.post('/register',validateUser, (req, res) => {
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
        res.status(500).json({ message: 'error registering user'})
    })
   
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})

function validateUser(req, res, next) {
    const { username, password } = req.body
    if(username && password) {
        next()
    } else {
        res.status(400).json({ message: 'invalid info, provide a username and password' })
    }
}

function validateCredentials(req, res, next) {

}

module.exports = router

