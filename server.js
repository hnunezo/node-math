require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./mongo");
const usersRouter = require("./controllers/users");
const examsRouter = require("./controllers/exams");
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleError");
const loginRouter = require("./controllers/login");

app.get("/", (req, res) => {
  res.send("Server to MATHGRAM running ");
});

app.use("/api/users", usersRouter);
app.use("/api/exams", examsRouter);
app.use("/api/login", loginRouter);

app.use(notFound);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log("running");
});
