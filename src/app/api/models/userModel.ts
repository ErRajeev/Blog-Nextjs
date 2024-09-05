// models/userModel.js (or userModel.ts if using TypeScript)
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String }
}, { collection: 'users' }); // Explicitly set the collection name

// Check if the model already exists to avoid recompilation during hot reloads
const User = models?.User || model('User', userSchema);

export default User;
