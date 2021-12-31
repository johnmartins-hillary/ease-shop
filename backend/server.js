import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routers from "./Routers/routers.js";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";

dotenv.config();

//app config
const app = express();
const port = process.env.PORT || 9000;

//mongodb connection
const connection_url = "mongodb://localhost/amazona";
mongoose.connect(process.env.MONGODB_URL || connection_url, {
  useNewurlParser: true,
  useUnifiedTopology: true,
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

//routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use(routers);
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
