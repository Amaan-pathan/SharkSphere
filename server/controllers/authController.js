import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { validateRegister,validateLogin } from "../utils/validator.js";
import { sendVerificationEmail } from "../utils/email.js";
import { error } from "console";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Step 1: Validate
    const validation = validateRegister({
      email,
      password,
      name,
    });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }
    // Step 2: Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Step 3: Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Step 4: Generate token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // Step 5: Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        emailVerified: false,
      },
    });

    try {
      await sendVerificationEmail(email, verificationToken);
      console.log("✅ Verification email sent to:", email);
    } catch (emailError) {
      console.error("❌ Email error:", emailError.message);
    }
    // Step 7: Return response
    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Step 1: Find user with this verification token
    const user = await prisma.user.findUnique({
      where: {
        verificationToken: token
      }
    });

    // Step 2: If not found, return error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Step 3: Update user (emailVerified = true, verificationToken = null)
    await prisma.user.update({
      where: {
        id: user.id  // Use id instead of token (more efficient)
      },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    });

    // Step 4: Return success response
    return res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now login."
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Step 1: Validate input
    const validation = validateLogin({
      email,
      password
    });
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false, // Changed from 'status' to 'success' for consistency
        errors: validation.errors
      });
    }
    
    // Step 2: Find user by email
    const user = await prisma.user.findUnique({ // Added 'await' - IMPORTANT!
      where: {
        email
      }
    });
    
    // Step 3: Check if user exists
    if (!user) {
      return res.status(401).json({ // Changed 400 to 401 (Unauthorized)
        success: false,
        message: "Invalid credentials" // Don't reveal if email exists or not (security)
      });
    }
    
    // Step 4: Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials" 
      });
    }
    
    // Step 5: Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({ 
        success: false,
        message: "Please verify your email before logging in"
      });
    }
    
    // Step 6: Generate JWT token
    const token = generateToken(user.id);
    
    // Step 7: Return response (token + user data, NO password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};