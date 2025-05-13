import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // Перевірка наявності необхідних полів
      const { email, password } = req.body;
      if (!email || !password) {
        throw Error("Email and password are required");
      }

      // Спроба авторизації
      const data = authService.login({ email, password });
      res.data = data;
    } catch (err) {
      res.err = { error: true, message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };