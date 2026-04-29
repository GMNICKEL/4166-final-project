import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Authentication required");
      error.status = 401;
      throw error;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      const error = new Error("Invalid authorization header");
      error.status = 401;
      throw error;
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Invalid or expired token";
    }

    next(error);
  }
}