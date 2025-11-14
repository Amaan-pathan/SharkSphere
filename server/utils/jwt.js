import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload 
    process.env.JWT_SECRET, // Secret key
    { expiresIn: process.env.JWT_EXPIRE || "7d" } // Token expiry
  );
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};