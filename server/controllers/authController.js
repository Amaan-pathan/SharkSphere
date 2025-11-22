import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { validateRegister, validateLogin } from "../utils/validator.js";
import { sendVerificationEmail } from "../utils/email.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate
    const validation = validateRegister({ email, password, name });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        emailVerified: false,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
      console.log("✅ Verification email sent to:", email);
    } catch (emailError) {
      console.error("❌ Email error:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Registration successful! Please check your email to verify.",
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

// VERIFY EMAIL (Changed to Redirect)
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user by verification token
    const user = await prisma.user.findUnique({
      where: {
        verificationToken: token,
      },
    });

    // Invalid or expired token → redirect
    if (!user) {
      return res.redirect(
        "https://shark-sphere-phi.vercel.app/login?error=invalid-token"
      );
    }

    // Verify email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    // SUCCESS REDIRECT
    return res.redirect(
      "https://shark-sphere-phi.vercel.app/login?verified=true"
    );
  } catch (error) {
    console.error("Email verification error:", error);

    return res.redirect(
      "https://shark-sphere-phi.vercel.app/login?error=server-error"
    );
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check email verification
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// GET AUTH USER
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
