import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.data = fighterService.getAll();
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  try {
    const fighter = fighterService.getOne({ id: req.params.id });
    res.data = fighter || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createFighterValid, (req, res, next) => {
  try {
    res.data = fighterService.create(req.body);
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateFighterValid, (req, res, next) => {
  try {
    const fighter = fighterService.update(req.params.id, req.body);
    res.data = fighter || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", (req, res, next) => {
  try {
    const fighter = fighterService.delete(req.params.id);
    res.data = fighter || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };