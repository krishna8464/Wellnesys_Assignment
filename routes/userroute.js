
const express = require("express");
const app = express();
const userRouter = express.Router();
const {errorHandler} = require("../middleware/errorhandler")
const {logger} = require("../middleware/logger");


const { saveUser, getUser } = require("../controller/user.controller");

userRouter.post("/",logger, saveUser);
userRouter.get("/",logger, getUser);

module.exports = { userRouter };