const responseMiddleware = (req, res, next) => {
  if (res.err) {
    return res.status(400).json(res.err);
  }

  if (res.data === null) {
    return res.status(404).json({ error: true, message: "Not found" });
  }

  return res.status(200).json(res.data);
};

export { responseMiddleware };