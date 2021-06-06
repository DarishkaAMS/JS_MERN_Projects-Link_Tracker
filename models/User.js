import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{ type: mongoose.Types.ObjectId, ref: 'Link' }]
});

// var User = model('User', userSchema);

// export default User;

var User = mongoose.model('userSchema', userSchema);

export default User;