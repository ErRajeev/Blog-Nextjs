// models/userModel.js (or userModel.ts if using TypeScript)
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true,  trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false, required: false },
    image : { type: String },
    googleId: { type: String, unique: true }
}, { collection: 'users',  timestamps: true  }); // Explicitly set the collection name

// Check if the model already exists to avoid recompilation during hot reloads
const User = models?.User || model('User', userSchema);

export default User;
