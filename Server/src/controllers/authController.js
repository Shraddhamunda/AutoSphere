import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { registerSchema , loginSchema } from "../validators/authValidator.js";
import { z } from "zod";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

dotenv.config();

const secret_key = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: z.treeifyError(validation.error),
      });
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }
    const salt = Number(process.env.SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!secret_key) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        userId: newUser.id,
        role: newUser.role,
      },
      secret_key,
      { expiresIn: "1d" },
    );

    return res.status(201).json({
      success: true,
      message: "User is registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



