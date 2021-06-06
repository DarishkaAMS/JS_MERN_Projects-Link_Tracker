import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import authRouter from './routes/auth_routes.js'

const app = express();

app.use('/api/auth', authRouter);


const PORT = config.get('port') || 5000;

async function startDB() {
    try{
        await mongoose.connect(config.get('mongoDBUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(5000, () => console.log(`App is alive at post ${PORT}`))
    } catch (error){
        console.log('Server Error: ', error.message);
        process.exit(1)
    }
};

startDB();


