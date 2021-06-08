import bcrypt from 'bcryptjs';
import config from 'config';
import express from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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
        console.log('BODY:', req.body);
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

router.post(
    '/login', 
    [
        check('email', "Please give me a correct email").normalizeEmail().isEmail(),
        check('password', "What is your password?").exists()
    ],
    async(req, res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Sorry, but I can't login you with this data"
            })
        };

    const {email, password} = req.body; 
    const user = await User.findOne({ email });

    if (!user){
        return res.status(400).json({ message: "Hmm... There is no such user" })
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch){
        return res.status(400).json({ message: "Hmm... Last time you use different password" })
    };

    const token = jwt.sign(
        { userId: user.id },
        config.get("jwtSecretKey"),
        { expiresIn: '1h'}
    );

    res.status(200).json({ token, userId: user.id })

    } catch (error) {
        res.status(500).json({ message: "Oops...Server error" });
    };
});

export default router;
