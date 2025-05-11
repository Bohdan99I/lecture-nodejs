import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.data = fightersService.getAll();
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", (req, res, next) => {
  try {
    const fight = fightersService.getOne({ id: req.params.id });
    res.data = fight || null;
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;
    if (!fighter1 || !fighter2) {
      throw Error("Both fighters must be specified");
    }
    res.data = fightersService.create(fighter1, fighter2);
  } catch (err) {
    res.err = { error: true, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };