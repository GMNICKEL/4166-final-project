import { signup, login } from "../services/authService.js";

export async function signupHandler(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const newUser = await signup(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export async function loginHandler(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const token = await login(email, password);
    res.status(200).json({ accessToken: token });
  } catch (error) {
    next(error);
  }
}