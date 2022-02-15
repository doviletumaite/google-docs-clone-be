import express from "express";
import createHttpError from "http-errors";
import documentModel from "../schema/document.js"

const documentRouter = express.Router()
documentRouter.post("/newaccount", async (req, res, next) => {
    try {
        const newDocument = new documentModel(req.body)
        const saveDocument = await newDocument.save()
        res.send({saveDocument})
    } catch (error) {
        next(error)
    }
})
documentRouter.get("/", async (req, res, next) => {
    try {
      const document = await documentModel.find({
        name: req.query.name,
      }) ;
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

  export default documentRouter