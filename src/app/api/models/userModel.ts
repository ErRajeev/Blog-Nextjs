import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false, required: false },
    image: { type: String },
    googleId: { type: String, unique: true }
    }, 
    { collection: 'users', timestamps: true }
);

// Prevent model recompilation in hot reload
const User = models.User || model('User', userSchema);

export default User;