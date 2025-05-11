import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!firstName || !lastName || !email || !phone || !password) {
    res.err = { error: true, message: "Missing required fields" };
    return next();
  }

  // Перевірка наявності зайвих полів
  const allowedFields = Object.keys(USER);
  const receivedFields = Object.keys(req.body);
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  
  if (extraFields.length > 0) {
    res.err = { error: true, message: "Extra fields are not allowed" };
    return next();
  }

  // Перевірка формату email (тільки gmail)
  if (!email.endsWith('@gmail.com')) {
    res.err = { error: true, message: "Email must be a Gmail address" };
    return next();
  }

  // Перевірка формату телефону
  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phone)) {
    res.err = { error: true, message: "Phone must be in format +380xxxxxxxxx" };
    return next();
  }

  // Перевірка довжини пароля
  if (password.length < 4) {
    res.err = { error: true, message: "Password must be at least 4 characters long" };
    return next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
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
  const allowedFields = Object.keys(USER);
  const receivedFields = Object.keys(updateData);
  const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
  
  if (extraFields.length > 0) {
    res.err = { error: true, message: "Extra fields are not allowed" };
    return next();
  }

  // Валідація окремих полів, якщо вони присутні
  if (updateData.email && !updateData.email.endsWith('@gmail.com')) {
    res.err = { error: true, message: "Email must be a Gmail address" };
    return next();
  }

  if (updateData.phone && !/^\+380\d{9}$/.test(updateData.phone)) {
    res.err = { error: true, message: "Phone must be in format +380xxxxxxxxx" };
    return next();
  }

  if (updateData.password && updateData.password.length < 4) {
    res.err = { error: true, message: "Password must be at least 4 characters long" };
    return next();
  }

  next();
};

export { createUserValid, updateUserValid };