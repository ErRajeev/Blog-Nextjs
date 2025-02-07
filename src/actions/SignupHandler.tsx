"use server";

import { transporter } from "@/actions/transporter";
import Otp from "@/app/api/models/otpModel";
import User from "@/app/api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";

const ADMIN_SENDER_EMAIL = process.env.ADMIN_SENDER_EMAIL;

type ValidationResult = {
  success: boolean;
  message: string;
};

const CredentialSignup = async (
  name: string,
  email: string,
  password: string
) => {
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return { success: false, message: "All fields are required." };
  }

  try {
    await dbConnect();
    const userExists = await User.exists({ email }).lean();
    if (userExists) return { success: false, message: "User already exists." };

    const isSended = await generateAndStoreOtp(email);

    if (isSended) {
      return { success: true, message: "OTP sent successfully." };
    } else {
      return {
        success: false,
        message: "Failed to send OTP. Try again later.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error during signup. Please try again.",
    };
  }
};

const validateSignupOtp = async (
  name: string,
  email: string,
  password: string,
  otp: string
): Promise<ValidationResult> => {
  if (!name?.trim() || !email?.trim() || !password?.trim() || !otp?.trim()) {
    return { success: false, message: "Try again after some time." };
  }
  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return { success: false, message: "Invalid OTP." };
    }

    if (otpRecord.used) {
      return { success: false, message: "OTP has already been used." };
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
    return { success: true, message: "Account created successfully." };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

const generateAndStoreOtp = async (email: string): Promise<boolean> => {
  try {
    const otp = randomInt(100000, 999999).toString(); // Generate a secure 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Set expiration to 5 minutes

    // Store OTP in the database
    await Otp.create({ email, otp, expiresAt, used: false });

    const mailOptions = {
      from: ADMIN_SENDER_EMAIL,
      to: email,
      subject: "Welcome to Blogy",
      html: `<html><body><h3>Your OTP is: <strong>${otp}</strong></h3><p>This OTP will expire in 5 minutes.</p></body></html>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

export { CredentialSignup, validateSignupOtp };
