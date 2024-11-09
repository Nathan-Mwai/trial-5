import "dotenv/config"
import express from "express";
import connectToDatabase from "./config/db";
import { NODE_ENV, PORT } from "./constants/env";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.listen(4004, async () => {
  console.log(`Server is running on port ${PORT} in the ${NODE_ENV} environment`);
  await connectToDatabase()
});
