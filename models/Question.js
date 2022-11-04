const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  fnumber: Number,
  snumber: Number,
  result: String,
  userResult: String,
  operation: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedobject) => {
    returnedobject.id = returnedobject._id;
    delete returnedobject._id;
    delete returnedobject.__v;
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
