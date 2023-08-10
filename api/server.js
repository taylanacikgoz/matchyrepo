const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("../data/config/dbConnection");

connectDB();

const server = express();
const userRoutes = require("./routes/users/userRoute");
const authRoutes = require("./routes/auth/authRoute");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", userRoutes);
server.use("/api/auth", authRoutes);

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
