import { userModel } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// for user register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res.status(404).json({
        success: false,
        message: "User already exists",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(404).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.status(404).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    const mailOption = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: "Welcome to our platform",
      html: `Hello dear ${name}, welcome to our shoplaza!
        We are glad to have you here. You can now start shopping with us.
        <p> You have successfully registered with email id: ${email}</p>`,
    };
    await transporter
      .sendMail(mailOption)
      .then(() => {
        console.log("email sent successfully");
      })
      .catch((error) => {
        console.log("Error in sending email", error);
      });
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      error: false,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({
        message: "User login successfully",
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};

// for admin login
export const adminLogin = async (req, res) => {
  try {
    const {email ,password} = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.status(200).json({
        message:"welcome admin",
        success:true,
        token
      })
    } else {
      res.status(404).json({
        message:"invalid credentails",
        success:false 
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};
