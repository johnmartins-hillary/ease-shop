import express from "express";

const routers = express.Router();

routers.get("/", (req, res) => {
  res.send("Server is Ready");
});

export default routers;
