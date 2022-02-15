import express from "express";
import createHttpError from "http-errors";
import userModel from "../schema/user.js"

const userRouter = express.Router()
userRouter.post("/newaccount", async (req, res, next) => {
    try {
        const newUser = new userModel(req.body)
        const saveUser = await newUser.save()
        res.send({saveUser})
    } catch (error) {
        next(error)
    }
})
userRouter.get("/", async (req, res, next) => {
    try {
      const user = await userModel.find({
        username: req.query.username,
      }) ;
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

  export default userRouter