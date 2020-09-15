const express = require('express')


const router = express.Router()

const Users = require('./userModel')

router.get('/', (req,res) => {
    Users.get()
    .then(users => {
        console.log(users)
        res.status(200).json({ data: users })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

module.exports = router