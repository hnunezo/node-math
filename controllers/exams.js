const examsRouter = require("express").Router();
const Exam = require("../models/Exam");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const userExtractor = require("../middleware/userExtractor");

examsRouter.get("/", async (req, res) => {
  const exams = await Exam.find({});
  res.json(exams);
});

examsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id);
    res.json(exam);
  } catch (err) {
    next(err);
  }
});

examsRouter.post("/", userExtractor, async (req, res, next) => {
  const { body } = req;
  const { type, requirement, grade } = body;

  const { userId } = req;

  const user = await User.findById(userId);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const newExam = new Exam({
    date: today,
    type,
    requirement,
    grade,
  });

  try {
    newExam.save();
    user.exams = user.exams.concat(newExam._id);
    user.save();
    res.json(newExam);
  } catch (err) {
    next(err);
  }
});

examsRouter.put("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const { questions, grade } = req.body;
  const exam = await Exam.findById(id);

  const examUpdated = {
    date: exam.date,
    type: exam.type,
    requirement: exam.requirement,
    grade: grade,
    questions,
  };

  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, examUpdated, {
      new: true,
    });
    res.json(updatedExam);
  } catch (err) {
    next(err);
  }
});

examsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const user = await User.findById(userId);
  try {
    await Exam.findByIdAndDelete(id);
    user.exams = user.exams.filter((el) => el._id.toString() !== id);
    user.save();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = examsRouter;
