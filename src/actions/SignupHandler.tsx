"use server";

import { transporter } from "@/actions/transporter";
import Otp from "@/app/api/models/otpModel";
import User from "@/app/api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";

type ValidationResult = {
  success: boolean;
  message: string;
};

const CredentialSignup = async (
  name: string,
  email: string,
  password: string
) => {
  if (!name || !password || !email) {
    return "Enter the Details";
  }

  try {
    await dbConnect();
    const userExists = await User.exists({ email });
    if (userExists) return "User already exists";
    generateAndStoreOtp(email);
    return true;
  } catch (error) {
    return "Error during signup. Please try again."; // Return string instead of an Error instance
  }
};

const validateSignupOtp = async (
  name: string,
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
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true, message: "An Account has been created." };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

const generateAndStoreOtp = async (email: string): Promise<string> => {
  const otp = randomInt(100000, 999999).toString(); // Generate secure 6-digit OTP

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Set expiration (5 minutes)

  // Store OTP in the database
  await Otp.create({ email, otp, expiresAt });

  const mailOptions = {
    from: process.env.ADMIN_SENDER_EMAIL,
    to: email,
    subject: "Wellcome to Blogy",
    html: `<html><body><h3>Your OTP is: ${otp}</h3></body></html>`,
  };

  await transporter.sendMail(mailOptions);
  return otp;
};

export { CredentialSignup, validateSignupOtp };
