import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/generateToken.js";

const sendAuthResponse = (user, statusCode, res) => {
  const token = generateToken({ id: user._id, role: user.role });
  res.status(statusCode).json({
    success: true,
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role: "customer" });
  sendAuthResponse(user, 201, res);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  sendAuthResponse(user, 200, res);
};

export const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};
