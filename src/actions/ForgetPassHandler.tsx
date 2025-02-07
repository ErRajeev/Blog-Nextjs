"use server";

import { transporter } from "@/actions/transporter";
import Otp from "@/app/api/models/otpModel";
import User from "@/app/api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { hash } from "bcryptjs";
import crypto from "crypto";

const ADMIN_SENDER_EMAIL = process.env.ADMIN_SENDER_EMAIL;

type ValidationResult = {
  success: boolean;
  message: string;
};

const CredentialForgetPass = async (email: string) => {
  if (!email?.trim())
    return { success: false, message: "Please enter a valid email." };

  try {
    await dbConnect();
    const userExists = await User.exists({ email }).lean();
    if (!userExists)
      return { success: false, message: "No account found with this email." };

    const otpSent = await generateAndStoreOtp(email);
    return otpSent
      ? { success: true, message: "OTP has been sent to your email." }
      : { success: false, message: "Failed to send OTP. Try again later." };
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again." };
  }
};

const validateForgetPassOtp = async (
  email: string,
  password: string,
  otp: string
): Promise<ValidationResult> => {
  if (!email?.trim() || !password?.trim() || !otp?.trim()) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) return { success: false, message: "Invalid OTP." };
    if (otpRecord.used) return { success: false, message: "OTP already used." };
    if (otpRecord.expiresAt < new Date())
      return { success: false, message: "OTP has expired." };

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    const hashedPassword = await hash(password, 12);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    await Otp.deleteOne({ email });

    return { success: true, message: "Password reset successfully." };
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again." };
  }
};

const generateAndStoreOtp = async (email: string): Promise<boolean> => {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    await Otp.create({ email, otp, expiresAt, used: false });

    const mailOptions = {
      from: ADMIN_SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: `<html><body><h3>Your OTP is: <strong>${otp}</strong></h3><p>This OTP will expire in 5 minutes.</p></body></html>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

export { CredentialForgetPass, validateForgetPassOtp };
