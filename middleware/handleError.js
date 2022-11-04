module.exports = (error, req, res, next) => {
  console.error(error.name, "aaaaaaaaaaaaaa");
  if (error.name === "CastError") {
    res.status(400).send({
      error: "ID used is malformed",
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" });
  } else {
    res.status(500).end();
  }
};
