require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/bookingRoutes");
const cancelRoutes = require("./routes/cancelRoutes");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use((req, res, next) => {
  console.log(`proccessing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/bakgarden/bookings", bookingRoutes);
// app.use("/api/v1/bakgarden/cancel", cancelRoutes);

const port = process.env.PORT || 5000;
const run = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
