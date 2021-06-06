import express from 'express';

import User from '../models/User.js';

const router = express.Router();

router.post('/register', async(req, res) => { 
    try {
        const {email, password} = req.body;


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
