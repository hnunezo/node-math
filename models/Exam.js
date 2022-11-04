const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  date: Date,
  type: String,
  requirement: String,
  grade: String,
  questions: Array,
});

examSchema.set("toJSON", {
  transform: (document, returnedobject) => {
    returnedobject.id = returnedobject._id;
    delete returnedobject._id;
    delete returnedobject.__v;
  },
});
const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
