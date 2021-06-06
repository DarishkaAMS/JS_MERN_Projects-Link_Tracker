import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

const app = express();

const PORT = config.get("PORT") || 5000;




app.listen(PORT, ()=>{
    console.log(`App is alive on the port ${PORT}!`);
})