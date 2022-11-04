const examsRouter = require("express").Router();
const Exam = require("../models/Exam");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userExtractor = require("../middleware/userExtractor");

examsRouter.get("/", async (req, res) => {
  const exams = await Exam.find({});
  res.json(exams);
});

examsRouter.post("/", async (req, res, next) => {
  const { body } = req;
  const { type, requirement, grade } = body;
});

module.exports = examsRouter;
