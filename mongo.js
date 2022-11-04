const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.tswnf2f.mongodb.net/data?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));
