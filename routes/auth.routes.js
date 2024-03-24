const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// api/auth/registration
router.post('/registration',
    [
        check('email')
            .exists()
            .isEmail()
            .withMessage('Field is required'),
        check('password')
            .isLength({ min: 3 })
            .withMessage('Password must be longer than 3 and shorter than 12')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data via registration'
                })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `User with ${email} already exists` })
            }

            const hashedPassword = await bcrypt.hash(password, 7)
            const user = new User({ email, password: hashedPassword })
            await user.save()

            res.status(201).json({ message: 'User has been created' })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })


// api/auth/login
router.post('/login',
    [
        check('email')
            .exists()
            .normalizeEmail()
            .isEmail()
            .withMessage('Enter correct email'),
        check('password')
            .exists()
            .withMessage('Enter the password')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data via login'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: `Can't find user` })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.status(200).json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })


module.exports = router