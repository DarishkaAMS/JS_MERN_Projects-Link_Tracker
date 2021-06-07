import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';

import User from '../models/User.js';

const router = express.Router();

router.post(
    '/register', 
    [
        check('email', 'Fishy Email').isEmail(),
        check('password', 'Password is too short').isLength({ min: 6 })
    ],
    async(req, res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Sorry, but I can't use this data for registration"
            })
        };

        const {email, password} = req.body;
        const candidate = await User.findOne({ email })

        if (candidate){
            return res.status(400).json({ message: "We've already welcomed user with this email..."})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: "User has been successfully created"});

    } catch (error) {
        res.status(500).json({ message: "Oops...Server error" });
    };
});

router.post('/login', async(req, res) => { 
    try {

    } catch (error) {

    };
});

export default router;
