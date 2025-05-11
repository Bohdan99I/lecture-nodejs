import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.data = userService.getAll();
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  try {
    const user = userService.getOne({ id: req.params.id });
    res.data = user || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createUserValid, (req, res, next) => {
  try {
    res.data = userService.create(req.body);
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateUserValid, (req, res, next) => {
  try {
    const user = userService.update(req.params.id, req.body);
    res.data = user || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", (req, res, next) => {
  try {
    const user = userService.delete(req.params.id);
    res.data = user || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };