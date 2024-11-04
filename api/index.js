const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");
const userRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

mongoose
  .connect(
    "DB_URI"
  )
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/customers", customerRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Can not find " + req.originalUrl));
});

app.use(globalErrorHandler);

const port = 3000;

app.listen(port, () => {
  console.log("The server is listening on port " + port);
});
