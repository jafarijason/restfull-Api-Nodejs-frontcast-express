const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/singup', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.find({ email: email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    msg: 'User Exists!'
                })
            } else {
                bcrypt.hash(password, 12, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(200).json({
                                    msg: 'User Created!'
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'Auth Failed!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: 'Auth Failed!'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret', { expiresIn: '1h' })
                    return res.status(200).json({
                        msg: 'Login Successful!',
                        token: token
                    })
                } else {
                    res.status(401).json({
                        msg: 'Auth Failed!'
                    })
                }
            })
        })
})

module.exports = router