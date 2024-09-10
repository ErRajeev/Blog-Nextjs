"use server";

import User from "@/app/api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { hash } from "bcryptjs";
import nodemailer from "nodemailer";

// A simple in-memory store for demonstration purposes
let otpStore: { [key: string]: string } = {};

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

    const otp = await generateOtp(email); // Generate OTP and send it
    otpStore[email] = otp; // Store OTP temporarily

    return null; // Indicating success with no error
  } catch (error) {
    console.error("Error during signup:", error);
    return "Error during signup. Please try again."; // Return string instead of an Error instance
  }
};

const validateOtp = async (
  name: string,
  email: string,
  password: string,
  otp: string
) => {
  const storedOtp = otpStore[email];
  if (storedOtp && storedOtp === otp) {
    // OTP is valid
    delete otpStore[email]; // Clear OTP after successful validation

    const hashedPassword = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return true;
  }
  return false;
};

const generateOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.ADMIN_SENDER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_SENDER_EMAIL,
    to: email,
    subject: `Sign Up Verification OTP`,
    html: `<html><body><h3>Your OTP is: ${otp}</h3></body></html>`,
  };

  await transporter.sendMail(mailOptions);
  return String(otp);
};

export { CredentialSignup, validateOtp };
