import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { name, power, defense, health } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!name || !power || !defense) {
    res.err = { error: true, message: "Missing required fields" };
    return next();
  }

  // Перевірка наявності зайвих полів
  const allowedFields = Object.keys(FIGHTER);
  const receivedFields = Object.keys(req.body);
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  
  if (extraFields.length > 0) {
    res.err = { error: true, message: "Extra fields are not allowed" };
    return next();
  }

  // Перевірка power
  if (power < 1 || power > 100 || !Number.isInteger(power)) {
    res.err = { error: true, message: "Power must be an integer between 1 and 100" };
    return next();
  }

  // Перевірка defense
  if (defense < 1 || defense > 10 || !Number.isInteger(defense)) {
    res.err = { error: true, message: "Defense must be an integer between 1 and 10" };
    return next();
  }

  // Перевірка health якщо воно вказане
  if (health !== undefined) {
    if (health < 80 || health > 120 || !Number.isInteger(health)) {
      res.err = { error: true, message: "Health must be an integer between 80 and 120" };
      return next();
    }
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, ...updateData } = req.body;

  // Перевірка наявності id в body
  if (id) {
    res.err = { error: true, message: "ID in request body is not allowed" };
    return next();
  }

  // Перевірка наявності хоча б одного поля для оновлення
  if (Object.keys(updateData).length === 0) {
    res.err = { error: true, message: "No fields to update" };
    return next();
  }

  // Перевірка наявності зайвих полів
  const allowedFields = Object.keys(FIGHTER);
  const receivedFields = Object.keys(updateData);
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  
  if (extraFields.length > 0) {
    res.err = { error: true, message: "Extra fields are not allowed" };
    return next();
  }

  // Валідація окремих полів, якщо вони присутні
  if (updateData.power !== undefined) {
    if (updateData.power < 1 || updateData.power > 100 || !Number.isInteger(updateData.power)) {
      res.err = { error: true, message: "Power must be an integer between 1 and 100" };
      return next();
    }
  }

  if (updateData.defense !== undefined) {
    if (updateData.defense < 1 || updateData.defense > 10 || !Number.isInteger(updateData.defense)) {
      res.err = { error: true, message: "Defense must be an integer between 1 and 10" };
      return next();
    }
  }

  if (updateData.health !== undefined) {
    if (updateData.health < 80 || updateData.health > 120 || !Number.isInteger(updateData.health)) {
      res.err = { error: true, message: "Health must be an integer between 80 and 120" };
      return next();
    }
  }

  next();
};

export { createFighterValid, updateFighterValid };