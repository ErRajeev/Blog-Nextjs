import { Schema, model, models } from 'mongoose';

const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { collection: 'otps', timestamps: true }
);

// TTL Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = models.Otp || model('Otp', otpSchema);
export default Otp;