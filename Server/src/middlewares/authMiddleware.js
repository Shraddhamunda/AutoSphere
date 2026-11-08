import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No valid token provided.",
    });
  }
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const verified = jwt.verify(token, secret_key);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
