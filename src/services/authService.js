import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

export async function signup(email, password, role) {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    const error = new Error("Email already in use");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      role: role || "USER",
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return newUser;
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}