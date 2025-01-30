"use server";

import { transporter } from "@/actions/transporter";
import Otp from "@/app/api/models/otpModel";
import User from "@/app/api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { hash } from "bcryptjs";
import crypto from "crypto";

type ValidationResult = {
  success: boolean;
  message: string;
};

const CredentialForgetPass = async (email: string) => {
  if (!email) return "Enter the Details";

  try {
    await dbConnect();
    const userExists = await User.exists({ email });
    if (!userExists) return "No account found!";
    generateAndStoreOtp(email);
    return true;
  } catch (error) {
    // console.error("Error during signup:", error);
    return "Error during signup. Please try again.";
  }
};

const validateForgetPassOtp = async (
  email: string,
  password: string,
  otp: string
): Promise<ValidationResult> => {
  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return { success: false, message: "Invalid OTP." };
    }

    if (otpRecord.used) {
      return { success: false, message: "OTP already used." };
    }

    if (otpRecord.expiresAt < new Date()) {
      return { success: false, message: "OTP has expired." };
    }

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    const hashedPassword = await hash(password, 10);
    await User.updateOne({ email }, { $set: { password: hashedPassword } });
    return { success: true, message: "Password reset." };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

const generateAndStoreOtp = async (email: string): Promise<string> => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate secure 6-digit OTP

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Set expiration (5 minutes)

  // Store OTP in the database
  await Otp.create({ email, otp, expiresAt });

  const mailOptions = {
    from: process.env.ADMIN_SENDER_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `<html><body><h3>Your OTP is: ${otp}</h3></body></html>`,
  };

  await transporter.sendMail(mailOptions);
  return otp;
};

export { CredentialForgetPass, validateForgetPassOtp };
