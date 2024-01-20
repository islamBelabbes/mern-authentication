require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./src/config/dbConnect");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorHandler = require("./src/middleware/errorHandlerMiddleware");
// cors
const options = require("./src/config/cors.config").corsOptions;
app.use(cors(options));

// json
app.use(express.json());

// Cookie
app.use(cookieParser());

// Db Connect
dbConnect();

app.use("/auth", require("./src/routes/authRoute"));
app.use("/auth", require("./src/routes/refreshTokenRoute"));
// 404 //
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// error handler
app.use(errorHandler);
// listen
const PORT = 5000;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
