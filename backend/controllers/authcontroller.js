import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// CUSTOMER REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "customer",
    });

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CUSTOMER LOGIN
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN FIXED LOGIN
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@warehouse.com" || password !== "Admin123") {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const adminPayload = {
    _id: "000000admin",
    email: "admin@warehouse.com",
    role: "admin",
  };

  const token = jwt.sign(adminPayload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, user: adminPayload });
};
