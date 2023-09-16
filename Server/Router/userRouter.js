const {
  getUser,
  addUser,
  updataUser,
  deleteUser,
} = require("../Controller/user");
const { authCheck } = require("../Middlewear/authCheck");
const userRouter = require("express").Router();
module.exports = userRouter
  .get("", authCheck, getUser)
  .post("/add", authCheck, addUser)
  .put("/updata", authCheck, updataUser)
  .delete("/delete", authCheck, deleteUser);
